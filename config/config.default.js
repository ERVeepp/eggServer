'use strict';

const path = require('path')
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583546958341_2057';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // 添加view配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }

  // 添加news的配置项 
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  }

  // add middleware robot
  config.middleware = [
    'robot',
    'gzip',
    'compress',
    'notfoundHandler',
    'errorHandler',
    'graphql',
    'auth',
    'listen'
  ]

  // 中间件设置
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  },

  // gzip
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
    match: '/static'
  }

  // bodyParser
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
    formLimit: '1mb',
  }

  // auth
  config.auth = {
    enable: true,
    match: '/api'
  }

  // koa-compress
  config.compress = {
    threshold: 2048,
  }

  // security
  config.security = {
    // redirect重定向
    domainWhiteList: ['.domain.com', 'http://localhost'],  // 安全白名单，以 . 开头
    xframe: {
      enable: true,
    },
    csp: {
      match: '/example',
      policy: {
        //...
      },
    },
    csrf: {
      enable: false,
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      // ignore: () => true,
      ignoreJSON: true
    },
    ssrf: {
      ipBlackList: [
        '10.0.0.0/8', // 支持 IP 网段
        '0.0.0.0/32',
        '127.0.0.1',  // 支持指定 IP 地址
      ],
      // 配置了 checkAddress 时，ipBlackList 不会生效
      checkAddress(ip) {
        return ip !== '127.0.0.1';
      },
    },
  }

  // 上传文件
  config.multipart = {
    mode: 'file',
    fileSize: '50mb', // 文件大小
    fileExtensions: ['.apk', 'xlsx'], // 增加对 apk 扩展名的文件支持
    // whitelist: ['.png'], // 覆盖整个白名单，只允许上传 '.png' 格式
  }

  // cookie
  config.cookies = {
    // httpOnly: true | false,
    // sameSite: 'none|lax|strict',
  }

  // Session
  config.key = 'EGG_SESS' // 承载 Session 的 Cookie 键值对名字
  config.maxAge = 86400000 // Session 的最大有效时间
  
  // jsonp
  config.jsonp = {
    whiteList: /^https?:\/\/test.com\//, // 白名单
    csrf: true,
    callback: 'callback', // 识别 query 中的 `callback` 参数
    limit: 100, // 函数名最长为 100 个字符
  };

  // 日志
  config.customLogger = {
    scheduleLogger: {
      // consoleLevel: 'NONE',
      // file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    }
  }

  // 异常处理
  config.onerror = {
    // 线上页面发生异常时，重定向到这个页面上
    errorPageUrl: '/50x.html',
  }

  // 自定义404响应
  config.notfound = {
    pageUrl: '/404.html',
  }

  // 多语言
  config.i18n = {
    defaultLocale: 'zh-CN',
    queryField: 'locale',
    cookieField: 'locale',
    // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  }

  // sql
  config.mysql = {
    // 单数据库信息配置
    clients: {
      db1: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'new_ssp',
        // 东八时区
        timezone: '+08:00'
      }
    },
    // 所有数据库配置的默认值
    default: {},
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '123456',
    database: 'new_ssp',
    timezone: '+08:00', // 东八时区
  };

  // 登录鉴权
  config.passportGithub = {
    key: 'your_clientID',
    secret: 'your_clientSecret',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };
  config.view = {
    mapping: {
      '.js': 'assets',
      '.html': 'nunjucks',
    },
    // // 如果还有其他模板引擎，需要合并多个目录
    // root: path.join(appInfo.baseDir, 'app/view'),
    // 默认的扩展
    // defaultExtension: '.html',
    // !下面这行配置必须得有, 要不然拿不到view里的tpl文件。
    // 默认的模板引擎
    defaultViewEngine: 'nunjucks',
  };

  // 全局自定义html模板
  config.assets = {
    templatePath: path.join(appInfo.baseDir, 'app/view/template.html'),
    templateViewEngine: 'nunjucks',
    publicPath: '/public/',
    devServer: {
      debug: false,
      // command: 'vue serve',
      command: 'vue -V',
      port: 8000,
      env: {
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8080',
        PUBLIC_PATH: 'http://127.0.0.1:8080',
      },
    },
    // 上下文数据
    contextKey: '__context__',
  }

  // proxy
  config.proxy = false,

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.baseURL =
    'http://localhost:7001/'

  // jwt
  config.jwt = {
    secret: '123456',
    // jwtSecret: 'shared-secret',
    jwtExpire: '30s',
    WhiteList: ['/UserLogin', '/login', '/site/login']
  }


  return {
    ...config,
    ...userConfig,
  };
};
