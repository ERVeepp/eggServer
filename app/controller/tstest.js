const Controller = require('egg').Controller;

class UsersController extends Controller {
  async index() {
    this.ctx.body = 'ts demo error!!!'
  }
}

module.exports = UsersController;
