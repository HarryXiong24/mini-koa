import http from 'http';
import EventEmitter from 'events';
import { compose } from './compose';
import context from '../common/context';
import request from '../common/request';
import response from '../common/response';
import { Context, Middleware, Request, Response } from '../types';
import { Stream } from 'stream';

export class Application extends EventEmitter {
  public middleware: Middleware;
  public context: Context;
  public request: Request;
  public response: Response;

  constructor() {
    super();
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  /**
   * 注册使用中间件
   * @param {Function} fn
   */
  use(fn: (ctx: Context, ...args: any[]) => any) {
    if (typeof fn === 'function') {
      this.middleware.push(fn);
    }
  }

  /**
   * 创建通用上下文
   * @param {Object} req
   * @param {Object} res
   */
  createContext = (req: Request, res: Response) => {
    const ctx: Context = Object.create(this.context);
    const request: Request = Object.create(this.request);
    const response: Response = Object.create(this.response);

    ctx.app = request.app = response.app = this;
    ctx.request = request;
    ctx.request.req = ctx.req = req;

    ctx.response = response;
    ctx.response.res = ctx.res = res;
    ctx.originalUrl = request.originalUrl = req.url;
    ctx.state = {};

    return ctx;
  };

  /**
   * 控制中间件的总回调方法
   */
  handleRequest = (req: any, res: any) => {
    res.statusCode = 404;
    const ctx = this.createContext(req, res);
    const middleware = this.middleware;
    // const body = ctx.body;
    // if (body) {
    //   res.end(body);
    // } else {
    //   res.end('Not Found');
    // }
    // 执行中间件
    // compose(middleware)(ctx).catch((err) => this.onerror(err));
    const fn = compose(middleware);
    fn(ctx)
      .then(() => {
        if (typeof ctx.body == 'object') {
          res.setHeader('Content-Type', 'application/json;charset=utf8');
          res.end(JSON.stringify(ctx.body));
        } else if (ctx.body instanceof Stream) {
          ctx.body.pipe(res);
        } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
          res.setHeader('Content-Type', 'text/htmlcharset=utf8');
          res.end(ctx.body);
        } else {
          res.end('Not found');
        }
      })
      .catch((err) => {
        this.emit('error', err);
        res.statusCode = 500;
        res.end('server error');
      });
  };

  /**
   * 服务事件监听
   * @param {*} args
   */
  listen(...args: any[]) {
    const server = http.createServer(this.handleRequest.bind(this));
    // console.log(...args);
    server.listen(...args);
  }
}

export default Application;
