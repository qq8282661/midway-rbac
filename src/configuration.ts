import { join } from 'path';

import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as orm from '@midwayjs/orm';
import * as redis from '@midwayjs/redis';
import * as axios from '@midwayjs/axios';

@Configuration({
  imports: [orm, redis, axios],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    console.log('onReady');
  }
}
