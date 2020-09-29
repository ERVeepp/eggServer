const Controller = require('egg').Controller;

class GetController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.mysql.index();
    ctx.body = result
  }
  async create() {}
  async update() {}
  async destroy() {}
}

module.exports = GetController;
