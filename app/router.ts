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
import summer from './router/summer'
import mockbi from './router/mock_bi'
import mock288 from './router/mock_288'
export default (app: Application) => {
  const { router, controller} = app;
  learn(app)
  summer(app)
  mockbi(app)
  mock288(app)
}
