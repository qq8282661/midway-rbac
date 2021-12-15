import { Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { ILogger } from '@midwayjs/logger';

import ErrorEnum from '../common/error-code';
import { Utils } from '../common/utils';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;

  @Inject()
  logger: ILogger;

  /**
   * 成功返回数据
   * @param op 返回配置，返回失败需要单独配置
   */
  protected success(data: any) {
    const resBody = {
      data: data ?? null,
      code: 200,
      message: 'OK',
    };
    return resBody;
  }

  /**
   * 成功返回不返回数据
   * @param op 返回配置，返回失败需要单独配置
   */
  protected ok(code?: number) {
    const resBody = {
      data: null,
      code: code ?? 200,
      message: code ? ErrorEnum[code] : 'success!',
    };
    return resBody;
  }

  /**
   * 操作结果数据
   */
  protected handle(isSave: boolean) {
    const resBody = {
      code: isSave ? 200 : 500,
      message: isSave ? 'success!' : 'fail',
    };
    return resBody;
  }

  protected resp(op: { data: any; code: number; message: string }) {
    const data = op?.data ?? null;
    const code = op?.code ?? 200;
    return {
      data,
      code,
      message: op?.message ? op.message : ErrorEnum[code] || 'unknown error',
    };
  }
}
