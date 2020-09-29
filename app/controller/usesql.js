const Controller = require('egg').Controller;

class GetController extends Controller {
  async index() {
    const ctx = this.ctx;
    const updatedata = ctx.query
    const result = await ctx.service.usesql.find(updatedata);
    ctx.body = result
  }
}

module.exports = GetController;
