'use strict';
const Service = require('egg').Service
const { createAPI } = require('../util/request')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
class UserService extends Service {
  // 生成jwt的方法
  async signJwt(options) {
    const { ctx } = this;
    const { _id, secert_key } = options
    return jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3600 * 24 * 7)
    }, secert_key, {
      expiresIn: '7d'
    });
  }
  verifyJwt(token) {
    const { ctx } = this;
    return jwt.verify(token, ctx.app.config.jwt.jwtSecret)
  }
  // salt
  // 生成随机的salt
  generateSalt(num) {
    const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
    let salt = ''
    const arr = [...new Array(num)]
    arr.forEach((ele, i) => {
      const p = Math.floor(Math.random() * set.length)
      salt += set[p]
    })
    return salt
  }
  // 个性化生成盐
  myGenerateSalt(num) {
    // Math.random().toString(16).substring(2, 15)
    const set = 'abcdefghijklmnopqurstuvwxyz'
    let salt = ''
    const arr = [...new Array(num)]
    arr.forEach((ele, i) => {
      const p = Math.floor(Math.random() * set.length)
      salt += set[p]
    })
    return salt
  }
  // md5加密
  md5(str) {
    return crypto
      .createHash('md5')
      .update(str)
      .digest('hex')
  }
  // 盐加密
  saltAndHash(pass) {
    const salt = generateSalt(4);
    return salt + md5(pass + salt)
  }
  mySaltAndHash(salt, pass) {
    return CryptoJS.MD5(pass + salt).toString()
  }
  // 验证密码
  validatePassword(plainPass, hashedPass) {
    const salt = hashedPass.substr(0, 10)
    const validHash = salt + md5(plainPass + salt)
    return hashedPass === validHash
  }
  myValidatePassword(plainPass, hashedPass) {
    return plainPass === hashedPass
  }
  // 登录
  async login(data) {
    // salt加密，之后去库中查找账号，之后返回jwt
    const { ctx } = this;
    const secert_key = ctx.app.config.jwt.jwtSecret;
    const user = await this.findUser(data)
    if (user) {
      // 制作jwt
      const result = await ctx.service.token.mySignJwt(user)
      return result
    }
  }
  // 查找用户
  async findUser(data) {
    const { ctx } = this;
    const { username, password } = data
    const client1 = app.mysql.get('db1');
    const sql = `SELECT * FROM cloudmobi_user WHERE email = '${username}'`
    const result = await client1.query(sql)
    // 此账号存在于库中
    if (result.length !== 0) {
      const user = result[0]
      const { salt: userSalt, password: userPassword } = user
      // 密码正确
      if (this.myValidatePassword(this.mySaltAndHash(userSalt, password), userPassword)) {
        return user
      }
      return false
    }
    return false
  }

  // 用户详情
  async findById(id) {
    const result = await createAPI(this, '/user', 'get', {
      id
    })
    return result.data
  }

  // 用户列表
  async findAll() {
    const result = await createAPI(this, '/user/all', 'get', {})
    return result.data
  }

  // 用户登录、jwt token
  async findByUsernamePassword(username, password) {
    const result = await createAPI(this, '/user/login', 'post', {
      username,
      password,
    });
    const user = result.data;
    user.token = jwt.sign({ uid: user.id }, this.config.jwt.jwtSecret, {
      expiresIn: this.config.jwt.jwtExpire,
    });
    return user;
  }

  // 用户删除
  async removeUser(id) {
    const result = await createAPI(this, '/user', 'delete', {
      id
    })
    return result.data
  }
}

module.exports = UserService