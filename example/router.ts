import { Router } from '../src';
import { KoaContext } from '../src/types';

// 初始化路由实例
const router = new Router();

// 注册路由请求信息缓存到实例中
router.get('/get', async (ctx: KoaContext) => {
  ctx.status = 400;
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      method: 'get',
    },
  };
});

router.post('/post', async (ctx: KoaContext) => {
  ctx.status = 400;
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      method: 'post',
    },
  };
});

router.get('/list', async (ctx: KoaContext) => {
  ctx.status = 400;
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      list: [0, 1, 2, 3, 4, 5, 6],
    },
  };
});

export default router;
