import { ErrorEnum } from './error-code';
/**
 * 全局自定义错误结构
 * 可以接受多条错误信息，用于业务抛错
 */
export class HttpException extends Error {
  status: number;
  errors: any[] | undefined;
  errCode: number;

  constructor(errorCode = 10000, message?: string, status?: number, errors?: any[]) {
    if (!status) {
      if (errorCode < 600 && errorCode >= 400) {
        status = errorCode;
      } else {
        status = 400;
      }
    }

    message = message ? message : ErrorEnum[errorCode];
    super(message + ` &>${status || ''}`); // 兼容ci测试时，assert无法自定义增加status
    this.status = status;
    this.errors = errors;
    this.errCode = errorCode;
  }
}
