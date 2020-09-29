'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 模板渲染
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  ua: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-ua'),
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 登录鉴权
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  assets: {
    enable: true,
    package: 'egg-view-assets',
  },
  graphql: {
    enable: true,
    package: 'egg-graphql'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
};
