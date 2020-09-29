'use strict';
module.exports = () => {
  return async function (ctx, next) {
    await next();
    console.log(ctx.request.url)
  }
};
