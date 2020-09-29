const Controller = require('egg').Controller;
class ProxyController extends Controller {
  async show() {
    const ctx = this.ctx;
    const start = Date.now();
    ctx.body = await ctx.service.post.get();
    const used = Date.now() - start;
    // 设置一个响应头
    ctx.set('show-response-time', used.toString());
  }
};
