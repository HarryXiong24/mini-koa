// koa 中间件引擎
import { Middleware, Context, NextHook } from '../types';

export function compose(middleware: Middleware) {
  // 中间件必须存放在一个数组
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }

  return function (ctx: Context, next?: NextHook) {
    let index = -1;

    return dispatch(0);

    function dispatch(i: number) {
      if (i < index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;

      let fn = middleware[i];

      if (i === middleware.length) {
        fn = next as NextHook;
      }

      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(
          fn(ctx, () => {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
