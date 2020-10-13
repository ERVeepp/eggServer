const jwt = require('jsonwebtoken')
// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
// 50008:令牌非法；50012:其他客户端登录；50014:令牌过期；
module.exports = options => {
  return async function auth(ctx, next) {
    console.log('jwt')
    // 跳过token验证，缓兵之计
    // return await next()
    // 开启 GraphiQL IDE 调试时，所有的请求放过
    if (ctx.app.config.graphql.graphiql) {
      await next()
      return
    }
    // const isWrite = ctx.app.config.jwt.WhiteList.find(ele => {
    //   const baseUrl = ctx.originalUrl.split('?')[0]
    //   return baseUrl === ele
    // })
    let token = ctx.request.header['authorization']
    if (token === undefined) {
      ctx.body = {
        code: 50000,
        message: '令牌为空，请登陆获取！',
        info: 'ctx'
      }
      ctx.status = 200
      return
    }
    token = token.split(/\s+/)[1]
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret, async (err, deoded) => {
      if (err) {
        return ctx.body = {
          code: 50008,
          message: '访问令牌鉴权无效，请重新登陆获取！',
          info: err
        }
      }
      await next()
    })
  }
}