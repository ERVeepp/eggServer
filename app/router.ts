/**
 * @param {Egg.Application} app - egg application
 */
// ! 使用js
// module.exports = app => {
//   const { router, controller } = app;
//   require('./router/learn.ts')(app);
//   // 2020年03月15日19:09:46 解析excel
//   router.post('/uploadexcel', app.controller.uploadexcel.post);
//   router.get('/readexcel', app.controller.readexcel.index);
// };
// ! 如果使用ts
import { Application } from 'egg'
import learn from './router/learn'
export default (app: Application) => {
  const { router, controller} = app;
  learn(app)
  // 2020年03月15日19:09:46 解析excel
  router.post('/uploadexcel', app.controller.uploadexcel.post);
  router.get('/readexcel', app.controller.readexcel.index);
}
