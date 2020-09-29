'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
  async info () {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  };
  // curl http://127.0.0.1:7001/user/1234

  // ruleForm
  async ruleform () {
    const ctx = this.ctx;
    const createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 're-password',
      },
    };
    // 如果校验报错，会抛出异常
    ctx.validate(createRule);
    ctx.body = ctx.request.body;
  }
  // curl -X POST http://127.0.0.1:7001/user --data 'username=abc@abc.com&password=111111&re-password=111111'

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
    // try {
    //   ctx.validate(loginRule, ctx.request.body);
    //   ctx.body = await ctx.service.user.login(ctx.request.body);
    // } catch (e) {
    //   ctx.body = e
    // }
    // ctx.body = ctx.request.body
  }

}

module.exports = userController;

