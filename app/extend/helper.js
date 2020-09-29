const XLSX = require('xlsx')

/**
 * 获取导入的XLSX文件中的数据
 * @param {object} file 请求中的文件对象，如：ctx.request.files[0]
 * @param {string} rwoTransform 行数据转换函数，比如：将字符串 'a,b,c' 转为 ['a', 'b', 'c'];
 */
function getImportXLSXData(file, rwoTransform = row => row) {
  const { filepath } = file;
  const workbook = XLSX.readFile(filepath);

  // 读取内容
  let exceldata = {};
  workbook.SheetNames.forEach((sheet, index) => {
    if (workbook.Sheets.hasOwnProperty(sheet)) {
      let title = []
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).map((row) => {
        title = Object.keys(row)
        const obj = {}
        title.forEach(key => {
          obj[key] = row[key]
        })
        return rwoTransform(obj)
      })
      exceldata[`sheet${index}`] = {
        title: title,
        data: data
      }
    }
  });
  return exceldata;
}
module.exports = {
  getImportXLSXData
}
