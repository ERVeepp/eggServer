import ClipboardJS from 'clipboard'
import CryptoJS from 'crypto-js'
import Axios from 'axios'
// import VConsole from 'vconsole'
// ! 判断当前运行环境
let nodeenv = process.env.NODE_ENV
if (nodeenv === 'development') {
  // const vconsole = new VConsole()
}
let cloneFlag = true
let instance = Axios.create({})
// console.log(nodeenv)
// 判断是否是每24小时执行一次
class HandleStorage {
  constructor (num) {
    let date = new Date()
    this.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    this.num = num
  }
  getData () {
    let token = localStorage.getItem('ttttttname')
    return token
  }
  setData () {
    localStorage.setItem('ttttttname', this.date)
  }
  getNum () {
    let num = localStorage.getItem('ttttttnamenum')
    return num
  }
  setNum (num) {
    localStorage.setItem('ttttttnamenum', num)
  }
  judgeFun () {
    if (this.getData() && this.getData() === this.date) {
      // 还在今天
      // 判断次数
      let thisNum = this.getNum()
      if (thisNum && thisNum < this.num) {
        this.setNum(parseInt(thisNum) + 1)
        return true
      } else {
        return false
      }
    } else {
      // 不在今天
      this.setData()
      this.setNum(1)
      return true
    }
  }
}
// aes
// eslint-disable-next-line new-cap
const key = CryptoJS.enc.Utf8.parse('16位密钥')
const iv = key
const secretFun1 = (data) => {
  // 加密
  let word = data
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}
const secretFun = (data) => {
  // console.log(data)
  // 解密
  let str = data
  // console.log(str)
  let reg = /\s/g
  let word = str.replace(reg, '')
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
let paramsStr = ''
let paramsObj = {}
let result = ''
class GetParams {
  constructor (url) {
    this.url = url
    this.paramsStr = ''
    this.paramsObj = {}
    return this.getParams()
  }
  getParams () {
    let url = this.url
    // let newurl = new window.URL(url)
    // let params = new window.URLSearchParams(newurl.search.slice(1))
    if (url.indexOf('?') !== -1) {
      let paramsStr = url.substring(url.indexOf('?') + 1, url.length)
      this.paramsStr = paramsStr
    }
  }
  getParamsStr () {
    return this.paramsStr
  }
  getParamsObj () {
    let arr = this.paramsStr.split('&')
    arr.forEach((ele) => {
      let key = ele.split('=')[0]
      let value = ele.split('=')[1]
      this.paramsObj[key] = value
    })
    return this.paramsObj
  }
}
// dispatch event
const event = new Event('click')
const dispatchUserEvent = (dom) => {
  // Listen for the event.
  let elem = document.querySelector(dom)
  elem.addEventListener('click', function (e) {
    console.log('dispatch')
  }, true)
  elem.dispatchEvent(event)
}
// impersion
let impFun = (url, data) => {
  console.log('impersion')
  // fetch(url).then(response => {
  //   return response
  // })
  instance({
    type: 'get',
    url: url,
    params: data
  })
}
// 获取数据
let getData = (jsdom) => {
  // * 获取token
  let baseUrl = '请求地址'
  instance({
    type: 'get',
    url: baseUrl,
    params: paramsObj
  })
  // ? 原生ajax => fetch
  // let url = `${baseUrl}${params}`
  // fetch(url).then(response => {
  //   return response.text()
  // })
    .then(data => {
      result = data.data
      let res = data.data
      // console.log(res)
      let domstr = ''
      if (jsdom) {
        domstr = jsdom.getAttribute('data-el')
        // domstr = document.querySelectorAll(domstr)
      }
      if (domstr) {
        var clipboard = new ClipboardJS(domstr, {
          text: function (trigger) {
            // alert('success')
            console.log('success')
            let useres = secretFun(res)
            // console.log(useres)
            return useres
          }
        })
        clipboard.on('success', function (e) {
          // console.log(e)
          // console.log('复制成功')
          // 发送网络监测请求
          if (cloneFlag) {
            impFun(`点击曝光监测地址`, paramsObj)
          }
          cloneFlag = false
          goHref()
        })
        clipboard.on('error', function (e) {
          // console.log(e)
          // console.log('复制失败，请长按复制')
        })
      }
    })
    .catch(e => console.log('Oops, error', e))
}
let browser = {
  versions: (function () {
    let u = navigator.userAgent
    let app = navigator.appVersion
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') === -1,
      souyue: u.indexOf('souyue') > -1,
      superapp: u.indexOf('superapp') > -1,
      weixin: u.toLowerCase().indexOf('micromessenger') > -1,
      Safari: u.indexOf('Safari') > -1
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
// console.log(browser)
let goHref = () => {
  if (browser.versions.ios) {
    console.log('iOS')
    window.location.href = 'taobao://'
    setTimeout(function () {
      let url = 'https://apps.apple.com/cn/app/%E6%89%8B%E6%9C%BA%E6%B7%98%E5%AE%9D-%E6%B7%98%E5%88%B0%E4%BD%A0%E8%AF%B4%E5%A5%BD/id387682726'
      window.location.href = url
      window.location.href = url
      // 为什么要加两遍我下面会说到
    }, 1000)
  } else if (browser.versions.android) {
    console.log('Android')
    window.location.href = 'taobao://**'
    // setTimeout(function () {
    //   window.location.href = "你的app的下载地址";
    // }, 1000)
  }
}
// TODO 创建监测函数
document.addEventListener('DOMContentLoaded', function (e) {
  let thisjs = document.querySelector('当前js的id名或者class名')
  if (thisjs && thisjs.src.indexOf('?') !== -1) {
    let url = thisjs.src
    let NewGetParams = new GetParams(url)
    paramsObj = NewGetParams.getParamsObj()
    paramsStr = NewGetParams.getParamsStr()
  }
  getData(thisjs)
  // 每天执行一次执行
  let judgeDate = new HandleStorage(3)
  let judgeDateFlag = judgeDate.judgeFun()
  console.log(judgeDateFlag)
  if (judgeDateFlag) {
    // getData()
    // dispatchUserEvent('body')
  }
  // document.body.addEventListener('click', (e) => {
  //   console.log('body_click')
  // }, true)
})
