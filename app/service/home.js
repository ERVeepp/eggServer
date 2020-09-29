'use strict';

const Service = require('egg').Service;

class homeService extends Service {
  async authCallback() {
    return {
      code: 20000,
      data: {
        // 库里边查询的token
        token: 'token',
        // 生成的jwt
        authorization: 'authorization'
      },
      info: 'success'
    }
  }
}

module.exports = homeService;
