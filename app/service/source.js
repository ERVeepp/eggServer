const Service = require('egg').Service;
const sleep = require('mz-modules/sleep');
let memoryCache = {};

class SourceService extends Service {
  get(key) {
    return memoryCache[key];
  }
  // 检查接口
  async checkUpdate() {
    // check if remote data source has changed
    const updated = await mockCheck();
    this.ctx.logger.info('check update response %s', updated);
    return updated;
  }
  // 更新接口
  async update() {
    // update memory cache from remote
    memoryCache = await mockFetch();
    this.ctx.logger.info('update memory cache from remote: %j', memoryCache);
  }
}
module.exports = SourceService;

let index = 0;
async function mockFetch() {
  await sleep(100);
  return {
    index: index++,
  };
}

async function mockCheck() {
  await sleep(100);
  return Math.random() > 0.5;
}
