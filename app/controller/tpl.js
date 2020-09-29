'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto')

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 示例：请求一个 npm 模块信息
    // const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
    //   // 自动解析 JSON response
    //   dataType: 'json',
    //   // 3 秒超时
    //   timeout: 3000,
    // });
    // let len = 64
    // let result = crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
    await ctx.render('home.tpl', {
      user: {
        email: '736354882@qq.com',
        name: '王伟'
      }
    })
  }
}

module.exports = HomeController;
