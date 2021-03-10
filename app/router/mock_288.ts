import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller, io, jwt } = app;
  // 2021-02-22 14:09:41 mock bi
  router.post('/game/api/game/config/price_scale', app.controller.mock_288.price_scale);
  router.post('/game/api/game/config/user_withdraw_value', app.controller.mock_288.user_withdraw_value);
}
