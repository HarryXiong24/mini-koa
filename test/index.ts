import Koa from '../src/index';

const app = new Koa();

app.use((ctx: any) => {
  // 测试 1
  ctx.response.res.end('hello ctx.response.res');
  // 测试 2
  // ctx.res.end('hello ctx.res');
  console.log('Server start!');
});

app.listen(3000);
