import Koa from '../src/index';
import { logger, Router } from '../src/index';
import { Context, NextHook } from '../src/types';

// 初始化 APP
const app = new Koa();
// 初始化路由实例
const router = new Router();

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

// app.use(async (ctx: Context) => {
//   ctx.body = 'hello ctx.res';
// });

// 注册路由请求信息缓存到实例中
router.get('/get', async (ctx: Context) => {
  ctx.body = 'index page';
});
router.post('/post', async (ctx: Context) => {
  ctx.body = 'post page';
});
router.get('/list', async (ctx: Context) => {
  ctx.body = 'list page';
});

// 路由实例输出父中间件 router.routes()
app.use(router.routes());

app.listen(3000, () => {
  console.log('Server start!');
});
