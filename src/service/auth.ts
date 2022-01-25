import { Config, Inject, Logger, Provide } from '@midwayjs/decorator';
import * as jsonWebToken from 'jsonwebtoken';
import { ILogger } from '@midwayjs/logger';
import { Context } from 'egg';

import { HttpException } from '../common/http-exception';

import { BaseService } from './base';

/**
 * 授权服务
 */
@Provide()
export class AuthService extends BaseService {
  @Inject()
  ctx: Context;

  @Config('jwt')
  jwt;

  @Config('salt')
  salt: string;

  @Logger()
  logger: ILogger;

  /**
   * JsonWebToken Sign
   * https://github.com/auth0/node-jsonwebtoken
   */
  jwtSign(sign: any, options?: any): string {
    return jsonWebToken.sign(sign, this.jwt.secret, {
      expiresIn: this.jwt.accessTokenExpiresIn,
      ...options,
    });
  }

  /**
   * JsonWebToken Verify
   * https://github.com/auth0/node-jsonwebtoken
   */
  jwtVerify(token: string, options?: any): any {
    return jsonWebToken.verify(token, this.jwt.secret, options);
  }

  async createToken(data: any) {
    const token = this.jwtSign({ id: data.id, role: data.role, client: data.client });
    await this.redisService.set(
      `${this.jwt.redisScope}:${data.client}:token:${data.id}`,
      token,
      'EX',
      this.jwt.accessTokenExpiresIn
    );
    return token;
  }

  async cacheAuthInfo(data: any): Promise<boolean> {
    // TODO:缓存登录信息
    return true;
  }

  async checkToken(token: string) {
    // console.log('token', token);
    try {
      const decode = this.jwtVerify(token);
      // console.log('decode', decode);
      const cachedToken = await this.redisService.get(
        `${this.jwt.redisScope}:${decode.client}:token:${decode.id}`
      );
      // console.log('cachedToken', cachedToken);

      if (cachedToken !== token) throw new Error();

      return decode;
    } catch (error) {
      // console.log(error);
      throw new HttpException(401);
    }
  }

  async recordPasswordError(id: string, role: string) {
    const key = `passwordError:${role}:${id}`;
    const count = await this.redisService.get(key);
    // console.log('count', count);
    if (!count) {
      await this.redisService.set(key, 1, 'EX', 60 * 5);
    } else if (Number(count) >= 5) {
      await this.redisService.set(`forbidden:${role}:${id}`, 1, 'EX', 60 * 1);
    } else {
      await this.redisService.incr(key);
    }
  }
}
