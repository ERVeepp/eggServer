'use strict';

const Service = require('egg').Service;

class postsService extends Service {
  async create() {
    return {
      id: 'wangwei'
    }
  }
}

module.exports = postsService;
