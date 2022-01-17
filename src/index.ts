import http from 'http';
import Context from './context';
import Request from './request';
import Response from './response';

export class Application {
  public fn: (ctx: any, ...args: any[]) => any;
  public context: Record<string, any>;
  public request: Record<string, any>;
  public response: Record<string, any>;

  constructor() {
    this.fn = () => {};
    this.context = Object.create(Context);
    this.request = Object.create(Request);
    this.response = Object.create(Response);
  }

  use(fn: (ctx: any, ...args: any[]) => any) {
    this.fn = fn;
  }

  createContext = (req: any, res: any) => {
    const ctx = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    ctx.app = request.app = response.app = this;
    ctx.request = request;
    ctx.request.req = ctx.req = req;

    ctx.response = response;
    ctx.response.res = ctx.res = res;
    ctx.originalUrl = request.originalUrl = req.url;
    ctx.state = {};
    return ctx;
  };

  callback = (req: any, res: any) => {
    const ctx = this.createContext(req, res);
    this.fn(ctx);
    const body = ctx.body;
    if (body) {
      res.end(body);
    } else {
      res.end('Not Found');
    }
  };

  listen(...args: any[]) {
    const server = http.createServer(this.callback);
    console.log(...args);
    server.listen(...args);
  }
}

export default Application;
