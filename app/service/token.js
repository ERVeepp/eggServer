'use strict';
const Service = require('egg').Service;
// 安装的jwt插件
const jwt = require('jsonwebtoken');
class TokenService extends Service {
  // 生成jwt的方法
  async signJwt(options) {
    const { _id, secert_key } = options
    return jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3600 * 24 * 7),
    }, secert_key);
  }
  async mySignJwt(options) {
    const { app } = this
    const token = app.jwt.sign({
      ...options
    }, app.config.jwt.secret, {
      expiresIn: '30s'
    });
    return token
  }
  // 验证jwt的方法
  async decodeJwt(options) {
    const { token, secert_key } = options
    try {
      return jwt.verify(token, secert_key);
    } catch (err) {
      return err;
    }
  }
}
module.exports = TokenService;