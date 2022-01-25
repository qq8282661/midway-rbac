import { Inject, Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware, MidwayWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

import {
  // NO_PERM_PREFIX,
  PUBLIC_PATH,
} from '../common/const';
import { AuthService } from '../service/auth';
import { HttpException } from '../common/http-exception';

@Provide()
export class JwtAuthMiddleware implements IWebMiddleware {
  @Inject()
  authService: AuthService;
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      if (PUBLIC_PATH[ctx.method][ctx.path]) {
        return next();
      }

      if (!ctx.header.authorization) throw new HttpException(401);
      const [, token] = ctx.header.authorization.split(' ');
      // 挂载对象到当前请求上
      ctx.state.user = await this.authService.checkToken(token);
      // console.log('ctx.state.user', ctx.state.user);
      if (!ctx.state.user) throw new HttpException(401);
      const role = {};
      if (ctx.state.user.role === 'student' && role[ctx.method][ctx.path]) {
        throw new HttpException(403);
      }

      // pass
      await next();
    };
  }
}
