'use strict';

const Controller = require('egg').Controller;

class Mock288Controller extends Controller {
  async price_scale() {
    const { ctx } = this;
    ctx.body = {"code":200,"msg":"成功!","data":"10000"}
  }
  async user_withdraw_value() {
    const { ctx } = this;
    ctx.body = {"code":200,"msg":"成功!","data":"{1:3000,2:10000,3:100000,4:1000000,5:2000000,6:3000,50:3000,51:5000,52:10000,53:50000,54:200000,55:500000,56:1000000}"}
  }
}

module.exports = Mock288Controller;
