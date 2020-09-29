'use strict';

const Controller = require('egg').Controller;

class searchController extends Controller {
  async getparams() {
    const ctx = this.ctx;
    ctx.body = `search: ${ctx.query.name}`;
    // curl http://127.0.0.1:7001/search?name=egg
  };

  async index() {
    const ctx = this.ctx;
    const type = ctx.query.type;
    const q = ctx.query.q || 'nodejs';

    if (type === 'bing') {
      ctx.redirect(`http://cn.bing.com/search?q=${q}`);
    } else {
      ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
    }
    // curl http://localhost:7001/search?type=bing&q=node.js
    // curl http://localhost:7001/search?q=node.js
  }
}

module.exports = searchController;
