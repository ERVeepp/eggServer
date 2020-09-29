exports.login = function* (ctx) {
  const { username, password } = ctx.request.body;
  const user = yield ctx.service.user.find({ username, password });
  if (!user) ctx.throw(403);
  ctx.session = { user };

  // 调用 rotateCsrfSecret 刷新用户的 CSRF token
  ctx.rotateCsrfSecret();

  ctx.body = { success: true };
}
