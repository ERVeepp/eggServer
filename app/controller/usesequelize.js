const Controller = require('egg').Controller;
class GetController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = ctx.query
    const result = await ctx.service.usesequelize.index();
    ctx.body = result
  }
}

module.exports = GetController;
