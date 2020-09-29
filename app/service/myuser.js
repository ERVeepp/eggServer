'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    // app.mysql.query(sql, values);

    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await this.getPicture(uid);

    return {
      name: user.user_name,
      age: user.age,
      picture,
    };
  }

  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
    return result.data;
  }

  // 登录
  async login(data) {
    // salt加密，之后去库中查找账号，之后返回jwt
    const { ctx } = this;
    const secert_key = ctx.app.config.jwt.jwtSecret;
    const user = await this.findUser(data)
    if (user) {
      // 制作jwt
      const result = await ctx.service.token.mySignJwt(user)
      return result
    }
  }

  async index() {
    const { ctx } = this
    console.log(ctx.state.user);
    /* 
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = ctx.state.user
  }
}
module.exports = UserService;
