import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller, io, jwt } = app;
  router.get('/news', controller.news.list);
  // 参数获取
  router.get('/user/:id/:name', controller.user.info);
  router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, app.controller.package.detail);
  // 表单内容的获取
  router.post('/form', app.controller.form.post);
  // 表单校验
  router.post('/user', app.controller.user.ruleform);
  // 重定向
  // 内部重定向
  router.get('index', '/home/index', controller.tpl.index);
  router.redirect('/', 'index', 302);
  // 外部重定向
  router.get('/search', app.controller.search.index);
  // 学习控制器
  router.post('createPost', '/api/post', controller.post.create);
  router.post('listPost', '/api/list', controller.post.list);
  // jsonp
  // const jsonp = app.jsonp();
  // app.router.get('/api/posts/:id', jsonp, app.controller.posts.show);
  // app.router.get('/api/posts', jsonp, app.controller.posts.list);
  // 学习service
  router.get('/user/:id', app.controller.user.info);
  // 进程间通讯（IPC）
  router.get('/ipc/index', app.controller.agent.index);
  // 学习数据库
  router.get('/usesql', app.controller.usesql.index)
  // 学习 sequelize
  router.get('/usesequelize', app.controller.usesequelize.index)
  // RESTful API
  router.resources('topics', '/api/v2/topics', app.controller.topics);
  // 挂载鉴权路由
  // app.passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);

  // 注册
  //页面
  router.get('/register', controller.home.register);
  
  //接口
  router.post('/register', controller.home.registerapi);

  // 渲染登录页面，用户输入账号密码
  router.get('/login', controller.home.login);
  router.post('/login', controller.user.login);
  router.post('/site/login', controller.myuser.login);
  router.post('/site/index', jwt, controller.myuser.index);
  router.post('/api/index', jwt, controller.myuser.index);

  // 登录校验
  app.passport.mount('github');
  // username, password
  router.get('/UserLogin', app.passport.authenticate('local', { successRedirect: '/authCallback' }));
  // 鉴权成功后的回调页面
  router.get('/authCallback', controller.home.authCallback);

  // io
  // io.of('/').route('server', io.controller.home.server);

  // 静态资源
  router.get('/assets', controller.home.render);
  // ts
  router.get('/ts', controller.tstest.index);
  // 原生操作mysql数据库
  router.resources('/mysql', '/api/mysql', controller.mysql)
}
