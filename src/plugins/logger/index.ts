import { Context, NextHook } from '../../types/index';

// 日志
export const logger = async function (ctx: Context, next: NextHook) {
  const res = ctx.res;

  // 拦截操作请求 request
  console.log(`<-- ${ctx.req.method} ${ctx.req.url}`);

  await next();

  // 拦截操作响应 request
  res.on('finish', () => {
    console.log(`--> ${ctx.req.method} ${ctx.req.url}`);
  });
};

export default logger;
