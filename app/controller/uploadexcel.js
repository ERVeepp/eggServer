const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const XLSX = require('xlsx');

module.exports = class extends Controller {
  importDataValidate (userData, allGroupNames) {
    return true
  }
  async post() {
    const { ctx } = this;
    let files = ctx.request.files
    let file = files[0]
    let result;
    try {
      // 处理文件
      // 每行数据要进行的特殊处理函数
      const formatDate = (numb, format = "-") => {
        let time = new Date(1900, 0, numb - 1)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        if (format && format.length === 1) {
          return `${year}${format}${month < 10 ? '0' + month : month}${format}${date < 10 ? '0' + date : date}`
        }
        return time
      }
      const rowTransform = (row) => {
        let obj = {}
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            const element = row[key]
            if (Number.isFinite(element)) {
              obj[key] = element.toFixed(2)
            } else {
              obj[key] = element
            }
            if (key == '日期') {
              obj[key] = formatDate(element)
            }
          }
        }
        return obj
      };
      // 将文件解析成js数据，上边封装的可复用的解析函数
      const userData = ctx.helper.getImportXLSXData(file, rowTransform);
      // 获取全部用户组的名称
      const allGroupNames = [];
      // 对解析出来的数据进行校验，如果校验失败，返回错误
      // 这里的校验函数 importDataValidate 就根据自己的情况写即可
      const isLegalData = this.importDataValidate(userData, allGroupNames);
      if (!isLegalData) {
        ctx.badRequest({
          data: {},
          msg: '导入文件数据校验失败',
        });
        return;
      }
      // 初步校验通过，导入数据库，返回结果
      result = await ctx.service.uploadexcel.post(userData);
      // TODO 此处存储到数据库
      // result = await ctx.service.uploadexcel.post(file, file.filename)
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath);
    }
    ctx.body = result;
  }
};