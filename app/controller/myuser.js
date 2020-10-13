'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
  // login
  async login() {
    const { ctx } = this;
    const loginRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        // compare: 're-password',
      },
    };
    // {
    //   "username": "736354882@qq.com",
    //   "password": "12345678"
    // }
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(loginRule, ctx.request.body);
    ctx.body = await ctx.service.user.login(ctx.request.body);
  }

  async index() {
    const { ctx } = this
    /* 
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = ctx.state
  }

}

module.exports = userController;

