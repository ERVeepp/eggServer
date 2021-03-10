import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller, io, jwt } = app;
  // 2020年03月15日19:09:46 解析excel
  router.post('/uploadexcel', app.controller.uploadexcel.post);
  router.get('/readexcel', app.controller.readexcel.index);
}
