// const Controller = require('egg').Controller;
const Controller = require('../core/base_controller');
class PostController extends Controller {
  async create() {
    const { ctx, service } = this;
    const createRule = {
      title: { type: 'string' },
      content: { type: 'string' },
    };
    // 校验参数
    try {
      ctx.validate(createRule);
      // 组装参数
      const author = ctx.session.userId;
      const req = Object.assign(ctx.request.body, { author });
      // 调用 Service 进行业务处理
      const res = await service.post.create(req);
      // 设置响应内容和响应状态码
      ctx.body = { id: res.id };
      ctx.status = 201;
    } catch (err) {
      ctx.status = 422;
      ctx.body = '没有通过验证';
    }
  }
  async list() {
    const posts = {};
    this.success(posts);
  }
}
module.exports = PostController;