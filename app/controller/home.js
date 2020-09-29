'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async register() {
    const { ctx } = this;
    await ctx.render('home/register.tpl', ctx)
  }
  async registerapi() {

  }
  async login() {
    const { ctx } = this;
    await ctx.render('home/login.tpl', ctx)
  }
  async loginapi() {
    const { ctx } = this;
    console.log('loginapi')
    const { username, password, rememberMe } = ctx.request.body;
    
  }
  async authCallback1() {
    const { ctx } = this;
    ctx.redirect('/')
  }
  async authCallback() {
    const { ctx } = this;
    const result = await ctx.service.home.authCallback()
    ctx.body = result
  }
  async server () {
    
  }
  async render() {
    await this.ctx.render('index.js', { data: 1 })
  }
}

module.exports = UsersController;
