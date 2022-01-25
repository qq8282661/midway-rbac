import { Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { Context } from 'egg';
import { RedisService } from '@midwayjs/redis';

/**
 * BaseService
 */
export class BaseService {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  @Inject()
  redisService: RedisService;
}
