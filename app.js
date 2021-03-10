'use strict';
const LocalStrategy = require('passport-local').Strategy;
const debug = require('debug')
const ThinkingAnalytics = require("thinkingdata-node")
var ta = ThinkingAnalytics.initWithDebugMode("APP-ID", "https://SERVER_URL")
console.log(1)
console.log(ta)
class AppBootHook {
  constructor(app) {
    globalThis.app = app;
    // 在中间件最前面统计请求时间
    app.config.coreMiddleware.unshift('report');
    // 自定义校验规则
    // app.validator.addRule('json', (rule, value) => {
    //   try {
    //     JSON.parse(value);
    //   } catch (err) {
    //     return 'must be json string';
    //   }
    // });

    // https://eggjs.org/zh-cn/advanced/loaderUpdate.html
    // 函数形式（已经作废，仅为兼容保留）
    // app.beforeStart(async () => {
    //   console.log('beforeStart')
    // });
    // app.ready(async () => {
    //   console.log('ready')
    // });
    // app.beforeClose(async () => {
    //   console.log('beforeClose')
    // });
  }

  // https://eggjs.org/zh-cn/advanced/loader.html
  async configWillLoad() {
    console.log('configWillLoad')
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    // this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async configDidLoad() {
    console.log('configDidLoad')
  }

  async didLoad() {
    console.log('didLoad')
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // this.app.queue = new Queue(this.app.config.queue);
    // await this.app.queue.init();

    // 例如：加载自定义的目录
    // this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
    //   fieldClass: 'tasksClasses',
    // });
  }

  async willReady() {
    console.log('willReady')
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    console.log('didReady')
    // 请将您的 app.beforeStart 中的代码置于此处。
    globalThis.app.logger.debug('app init');
    // 应用已经启动完毕

    // const ctx = await this.app.createAnonymousContext();
    // await ctx.service.Biz.request();

    // 定时任务初始化逻辑
    // 通过 app 使用 HttpClient
    // 示例：启动的时候去读取 https://registry.npm.taobao.org/egg/latest 的版本信息
    const result = await app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.logger.info('Egg latest version: %s', result.data.version);
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    // await globalThis.app.runSchedule('update_cache');
    // cluster
    // await app.runSchedule('force_refresh');
    // sql
    // 从配置中心获取 MySQL 的配置
    // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
    // const mysqlConfig = await app.configCenter.fetch('mysql');
    // app.database = app.mysql.createInstance(mysqlConfig);
    
    // IPC实战
    // cluster
    // 在启动自定义文件中监听 refresh 事件，并更新数据，所有的 Worker 进程都能收到这个消息，并触发更新，此时我们的方案二也已经大功告成了。
    // app.messenger.on('refresh', by => {
    //   app.logger.info('start update by %s', by);
    //   // create an anonymous context to access service
    //   // 创建一个匿名上下文
    //   const ctx = app.createAnonymousContext();
    //   // a convenient way to excute with generator function
    //   // can replaced by `co`
    //   // 在后台运行异步功能
    //   ctx.runInBackground(async () => {
    //     await ctx.service.source.update();
    //     app.lastUpdateBy = by;
    //   });
    // });


    // passport-local
    // ! 个人感觉用来做第三方登录的，把第三方账号存入数据库，然后登录，也可以用来账号密码登录。
    // 账号密码登录权鉴
    // 1
    // 每次刷新就会执行
    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, user) => {
      console.log('deserializeUser')
      console.log('每次刷新都会执行')
      return user;
    });
    // 2
    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
      console.log('verify')
      // 第三个触发
      // 用户名和密码
      const { username, password } = user
      // 检查用户
      // assert(user.username, 'username should exists');
      // assert(user.password, 'password should exists');
      // 从数据库中查找用户信息
      // 验证登录
      let result = await ctx.service.userlogin.login(username, password)
      if (result.code === 20000) {
        console.log('登陆成功')
        // 生成token
        const token = await ctx.service.token.signJwt({
          secert_key: ctx.app.config.jwt.jwtSecret,
          _id: result.id
        })
        // result = Object.assign({}, result, {
        //   authorization: token
        // })
        // 将token写入cookie 这是返回在客户端cookie中的token
        ctx.cookies.set('eggtoken', token, { maxAge: 60 * 1000, httpOnly: false, overwrite: true, signed: false })
      }
      const data = { ...result };
      // 从数据库中查找用户信息
      //
      // Authorization Table
      // column   | desc
      // ---      | --
      // provider | provider name, like github, twitter, facebook, weibo and so on
      // uid      | provider unique id
      // user_id  | current application user id

      // 查询数据库，获取到用户信息
      // const auth = await ctx.model.Authorization.findOne({
      //   uid: user.id,
      //   provider: user.provider,
      // });
      // 如果账号存在，则返回账号
      // const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
      // if (existsUser) {
      //   return existsUser;
      // }
      // 如果账号不存在，调用 service 注册新用户
      // const newUser = await ctx.service.user.register(user);
      // 2020年03月20日20:20:39 没return，所以卡了三个小时
      // return newUser;
      return user
    });
    // 3
    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    app.passport.serializeUser(function(ctx, user) {
      console.log('serializeUser')
      return user
    });

    // 挂载 strategy
    // ? http://localhost:7001/UserLogin?user=123报错
    // 参数错误会报错400
    app.passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    }, (req, username, password, done) => {
      console.log('LocalStrategy')
      // console.log(username, password)
      const user = {
        state: 'doVerify',
        username,
        password,
      };
      // console.log(JSON.stringify(user))
      // debug('%s %s get user: %j', req.method, req.url, user);
      // ! 按摆放顺序执行
      // 校验用户
      app.passport.doVerify(req, user, done);
      // 序列化用户信息后存储进 session
      app.passport.serializeUser(req, user, done);
      // 反序列化后取出用户信息
      app.passport.deserializeUser(req, user, done);


      // process.nextTick(function() {
      //   User.findOne({ 'local.username' : username}, function(err, user) {
      //       if (err)
      //         return done(err);
      //       if(user) {
      //         return done(null, false, req.flash('signupMessage', 'That Username is already taken.'));
      //       }
      //       else {
      //         var newUser = new User();
      //         newUser.local.username = username;
      //         newUser.local.password = newUser.generateHash(password);
      //         newUser.save(function(err) {
      //           if(err)
      //             throw err;
      //           return done(null, newUser);
      //         });
      //       }
      //   });
      // });


      // User.findOne({ 'local.username' : username}, function(err, user) {
      //   if(err)
      //     return done(err);
      //   if(!user)
      //     return done(null, false, req.flash('loginMessage', 'No user found.'));
      //   if(!user.validPassword(password))
      //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      //   return done(null, user);
      // });
    }));
  }

  async serverDidReady() {
    console.log('serverDidReady')
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    // globalThis.app.server.on('timeout', socket => {
    //   // handle socket timeout
    // });
  }

  async beforeClose() {
    console.log('beforeClose')
  }
}

module.exports = AppBootHook;
