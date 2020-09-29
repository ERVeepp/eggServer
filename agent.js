const Subscriber = require('./lib/subscriber');
// 现在我们来看看如何实现第三个方案。我们需要有一个消息中间件的客户端，它会和服务端保持长连接，这一类的长连接维持比较适合在 Agent 进程上做，可以有效降低连接数，减少两端的消耗。所以我们在 Agent 进程上来开启消息监听。
module.exports = agent => {
  agent.logger.info('init subscriber');
  // 我们在 Agent 进程上运行了一个 subscriber，来监听消息中间件的消息
  // const subscriber = new Subscriber();
  // // listen changed event, broadcast to all workers
  // // 监听所有事件，然后发送到所有的app
  // subscriber.on('changed', () => agent.messenger.sendToApp('refresh', 'push'));
  // // 监听error，打印错误日志❎❌！！！
  // subscriber.on('error', err => agent.logger.error(err));
};
