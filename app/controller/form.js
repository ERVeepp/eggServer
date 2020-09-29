exports.post = async ctx => {
  ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
};
// 模拟发起 post 请求。
// curl -X POST http://127.0.0.1:7001/form --data '{"name":"controller"}' --header 'Content-Type:application/json'
