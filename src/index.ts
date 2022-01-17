import http from 'http';

export class Application {
  public fn: (...args: any[]) => any;

  constructor() {
    this.fn = () => {};
  }

  use(fn: any) {
    this.fn = fn;
  }

  callback = (req: any, res: any) => {
    this.fn(req, res);
  };

  listen(...args: any[]) {
    const server = http.createServer(this.callback);
    console.log(...args);
    server.listen(...args);
  }
}

export default Application;
