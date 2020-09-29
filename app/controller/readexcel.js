const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const XLSX = require('xlsx');
module.exports = class extends Controller {
  async index() {
    const { ctx } = this; 
    // 每行数据要进行的特殊处理函数
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
        }
      }
      return obj
    };
    const filePath = './app/public/excelassets'
    //根据文件路径读取文件，返回文件列表
    let files = await fs.readdirSync(filePath)
    let fileName
    files.forEach((filename) => {
      if (filename.includes('xlsx')) {
        fileName = filename
      }
    })
    let filedir = path.join(filePath, fileName)
    let file = {
      filepath: filedir
    }
    let getImportXLSXData = ctx.helper.getImportXLSXData
    const userData = await getImportXLSXData(file, rowTransform);
    // 初步校验通过，导入数据库，返回结果
    const result = await ctx.service.readexcel.post(userData);
    ctx.body = result;
  }
}
