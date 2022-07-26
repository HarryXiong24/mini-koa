import Koa from '../src/index';
import { logger } from '../src/index';
import router from './router';
// import { Context, NextHook } from '../src/types';

// 初始化 APP
const app = new Koa();

app.use(logger);

// app.use(async (ctx: Context, next: NextHook) => {
//   console.log('action 001');
//   await next();
//   console.log('action 006');
// });

// app.use(async (ctx: Context, next: NextHook) => {
//   console.log('action 002');
//   await next();
//   console.log('action 005');
// });

// app.use(async (ctx: Context, next: NextHook) => {
//   console.log('action 003');
//   await next();
//   console.log('action 004');
// });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());

app.listen(3000, () => {
  console.log('Server start!');
});
