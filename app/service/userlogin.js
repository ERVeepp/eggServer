'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async login(options) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    // 把密码通过salt加密，然后去库里查
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    const data = {
      code: 20000,
      data: {
        // 库里边查询的token
        token: 'token',
        // 生成的jwt
        authorization: 'authorization'
      },
      info: 'success'
    }
    // app.mysql.query(sql, values);

    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    return data;
  }
}
module.exports = UserService;
