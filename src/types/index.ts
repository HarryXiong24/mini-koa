import request from '../common/request';
import response from '../common/response';

export interface Context {
  [propName: string]: any;
}
export type Request = Partial<typeof request> & {
  [propName: string]: any;
};
export type Response = Partial<typeof response> & {
  [propName: string]: any;
};
export type Middleware = ((ctx: Context, ...args: any[]) => any)[];
export type NextHook = () => any;
