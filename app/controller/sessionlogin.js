const Controller = require('egg').Controller;
const ms = require('ms');
class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    const { username, password, rememberMe } = ctx.request.body;
    const user = await ctx.loginAndGetUser(username, password);

    // 设置 Session
    ctx.session.user = user;
    // 如果用户勾选了 `记住我`，设置 30 天的过期时间
    if (rememberMe) ctx.session.maxAge = ms('30d');
  }
}
