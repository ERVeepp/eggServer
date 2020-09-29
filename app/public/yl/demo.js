// 验证规则
let Validate = (key, value, type) => {
  // 模拟网络环境
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 2) {
        resolve(false)
      } else {
        resolve(true)
      }
    }, Math.random() * 1000)
  })
}
let judgeValidate = async (arg) => {
  let flag = new Set()
  for await (const iterator of arg) {
    flag.add(iterator)
  }
  let arr = Array.from(flag)
  return !arr.includes(false)
}
judgeValidate([
  Validate('userPhoneNumber', 3),
  Validate('userId', 2),
  Validate('IDType', 1)
]).then(data => {
  console.log(data)
})

judgeValidate([
  Validate('img', 4)
]).then(data => {
  console.log(data)
})

