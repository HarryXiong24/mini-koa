import Koa from '../src/index';
import { logger } from '../src/index';
import { Context, NextHook } from '../src/types';

const app = new Koa();

app.use(logger);

app.use(async (ctx: Context, next: NextHook) => {
  console.log('action 001');
  await next();
  console.log('action 006');
});

app.use(async (ctx: Context, next: NextHook) => {
  console.log('action 002');
  await next();
  console.log('action 005');
});

app.use(async (ctx: Context, next: NextHook) => {
  console.log('action 003');
  await next();
  console.log('action 004');
});

app.use(async (ctx: Context) => {
  // 测试 1
  // ctx.response.res.end('hello ctx.response');
  // 测试 2
  ctx.body = 'hello ctx.res';
});

app.listen(3000, () => {
  console.log('Server start!');
});
