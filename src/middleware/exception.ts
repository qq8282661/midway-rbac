import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, MidwayWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { nanoid } from 'nanoid';

@Provide()
export class ExceptionMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const requestId = nanoid();
      try {
        ctx.set('x-request-id', requestId);
        await next();
        if (ctx.status === 404) {
          ctx.body = { code: 404, message: 'Not Found' };
        }
      } catch (err) {
        ctx.logger.error(`[Exception][x-request-id:${requestId}]  ${err.stack}`);

        // 兼容运行ci的时候，assert抛出的错误为AssertionError没有status
        const [message, messageStatus] = err.message.split(' &>');
        // console.log('message', message);

        let status = err.status || parseInt(messageStatus) || 500;

        if (err.name === 'ValidationError' || message === 'ValidationError') status = 422;

        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error =
          status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : message;

        // console.log('error', error);

        ctx.status = status;
        err.status = status;
        err.message = error;

        // 从 error 对象上读出各个属性，设置到响应中
        const resp = { message: error, code: err.errCode || status, data: null } as any;
        if (status === 422) {
          resp.data = err.errors || err.details; // 兼容 midway 参数校验
        }

        ctx.set('Content-Type', 'application/json');
        ctx.body = resp;
      }
    };
  }
}
