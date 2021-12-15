/* eslint-disable no-console */
import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext, MidwayWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      console.log('\x1B[34m=>\x1B[39m', 'ctx.method', ctx.method);
      // console.log('\x1B[34m=>\x1B[39m', 'ctx.path', ctx.path);
      console.log('\x1B[34m=>\x1B[39m', 'ctx.url', ctx.url);
      console.log('\x1B[34m=>\x1B[39m', 'ctx.request.body', ctx.request.body);

      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      await next();
      // console.log(ctx.state.user);

      // 控制器之后执行的逻辑
      console.log('共计耗时...\x1B[33m', Date.now() - startTime, '\x1B[39mms');
      console.log('\x1B[32m<=\x1B[39m', 'ctx.url', ctx.url);
      console.log('\x1B[32m<=\x1B[39m', 'ctx.status', ctx.status);
      console.log('\x1B[32m<=\x1B[39m', 'ctx.body', ctx.body);
    };
  }
}
