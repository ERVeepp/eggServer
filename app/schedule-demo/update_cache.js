const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    // cronOptions: 配置 cron 的时区等，参见 cron - parser 文档
    // immediate：配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
    // disable：配置该参数为 true 时，这个定时任务不会被启动。
    // env：数组，仅在指定的环境下才启动该定时任务。
    return {
      interval: '1m', // 1 分钟间隔
      // 每三小时准点执行一次
      // cron: '0 0 */3 * * *',
      type: 'all', // 指定所有的 worker 都需要执行
      disable: true,
      
    };
  }


  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = {
      data: '定时任务'
    }
    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    console.log('执行定时任务')
    this.ctx.logger.info('schedule updateOa2User begin')
    this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;