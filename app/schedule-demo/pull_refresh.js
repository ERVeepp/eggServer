exports.schedule = {
  interval: '10s',
  type: 'worker', // only run in one worker
};
// 方案二：再编写一个定时任务来实现方案一的检查逻辑，每 10s 让一个 worker 调用检查接口，当发现数据有变化时，通过 messenger 提供的方法通知所有的 Worker。
exports.task = async ctx => {
  const needRefresh = await ctx.service.source.checkUpdate();
  if (!needRefresh) return;

  // notify all workers to update memory cache from `file`
  // 进程间通讯
  ctx.app.messenger.sendToApp('refresh', 'pull');
};