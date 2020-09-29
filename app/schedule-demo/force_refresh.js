exports.schedule = {
  interval: '10m',
  type: 'all', // run in all workers
};
// 编写定时任务，实现方案一，每 10 分钟定时从远程数据源获取数据更新缓存做兜底。
exports.task = async ctx => {
  await ctx.service.source.update();
  ctx.app.lastUpdateBy = 'force';
};