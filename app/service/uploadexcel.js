'use strict';

const Service = require('egg').Service;
const fs = require('mz/fs');

class excelService extends Service {
  async post(data) {
    // 写成json文件
    let str = `globalThis.tableData= ${JSON.stringify(data, null, "\t")}`
    fs.writeFile('./app/public/excel/data.js', str, function (err) {
      if (err) { res.status(500).send('Server is error...') }
    })
    // TODO 存储到数据库
    return data
  }
}

module.exports = excelService;
