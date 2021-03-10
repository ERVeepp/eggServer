import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller, io, jwt } = app;
  // 2021-02-22 14:09:41 mock bi
  router.post('/bilogin', app.controller.mockbi.login);
  router.get('/permissions', app.controller.mockbi.getRoles);
  router.get('/group/get-pms-list', app.controller.mockbi.getRole);
  router.get('/role-permission/get-role-pms-list', app.controller.mockbi.getRole)
}
