import Koa from '../src/index';

const app = new Koa();

app.use((req: any, res: any) => {
  res.end('Hello World\n');
  console.log('Server start!');
});

app.listen(3000);
