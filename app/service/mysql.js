'use strict';

const Service = require('egg').Service;

class getService extends Service {
  async add() {
    
  }

  async delete(id) {
    
  }

  async update(row) {
    
  }

  async index() {
    const { app } = this;
    const client1 = app.mysql.get('db1');
    const conn = await client1.beginTransaction(); // 初始化事务
    const sql = `SELECT * FROM cloudmobi_user LIMIT 0, 2`
    let res
    // return await client1.query(sql);
    try {
      res = await conn.query(sql);
      await conn.commit(); // 提交事务
    } catch (err) {
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
    return res
  }
}

module.exports = getService;
