'use strict';

const Service = require('egg').Service;

class getService extends Service {
  async find(row) {
    let result
    if (!row) {
      result = await this.app.mysql.get('users', row);
    } else {
      result = await this.app.mysql.select('users');
    }
    
    return {
      data: result,
      // create_time: this.app.mysql.literals.now,
    };
  }
  async add() {
    // 插入
    const Literal = this.app.mysql.literals.Literal;
    const first = 'James';
    const last = 'Bond';
    let title = new Literal(`CONCAT("${first}", "${last}"`)
    const result = await this.app.mysql.insert('posts', { title: title}); // 在 post 表中，插入 title 为 Hello World 的记录

    // => INSERT INTO `posts`(`title`) VALUES('Hello World');

    console.log(result);
    // =>
    // {
    //   fieldCount: 0,
    //   affectedRows: 1,
    //   insertId: 3710,
    //   serverStatus: 2,
    //   warningCount: 2,
    //   message: '',
    //   protocol41: true,
    //   changedRows: 0
    // }

    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    return {
      info: insertSuccess
    }
  }

  async update(row) {
    let result = await this.app.mysql.update('posts', row); // 更新 posts 表中的记录
    const updateSuccess = result.affectedRows === 1;
    return {
      info: updateSuccess
    }
  }

  async delete(id) {
    let result = await this.app.mysql.delete('posts', {id: id}); // 更新 posts 表中的记录
    return {
      data: result
    }
  }

  // 事务
  // async sw () {
  //   const result = await app.mysql.beginTransactionScope(async conn => {
  //   // don't commit or rollback by yourself
  //   await conn.insert(table, row1);
  //   await conn.update(table, row2);
  //   return { success: true };
  // }, ctx); // ctx 是当前请求的上下文，如果是在 service 文件中，可以从 `this.ctx` 获取到
  // // if error throw on scope, will auto rollback
  // }

}

module.exports = getService;
