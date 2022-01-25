import * as crypto from 'crypto';
import { promisify } from 'util';

import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Context } from 'egg';
@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Config('jwt')
  jwt;

  /**
   * 获取请求IP
   */
  getReqIP(ctx: Context): string {
    const req: any = ctx.req;
    return (
      req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
    ).replace('::ffff:', '');
  }

  /**
   * 深复制一个json对象
   */
  deepCopy(source: any): any {
    const newObject = {};
    for (const key of Object.keys(source)) {
      if (source[key] !== undefined) {
        newObject[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
      }
    }
    return newObject;
  }
  // 数组去重
  uniqueArray(arr) {
    return Array.from(new Set(arr));
  }
  async pbkdf2(
    password: string,
    salt: string,
    iterations = 10000,
    keylen = 64,
    digest = 'sha256'
  ): Promise<string> {
    const buff = await promisify(crypto.pbkdf2)(password, salt, iterations, keylen, digest);
    return buff.toString('hex');
  }
}
