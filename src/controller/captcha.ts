import { Inject, Controller, Provide, Query, Get, ALL } from '@midwayjs/decorator';
import { Context } from 'egg';

import { CaptchaService } from '../service/captcha';
import { GetCaptchaCodeDto } from '../dto/captcha';

@Provide()
@Controller('/captcha')
export class CaptchaController {
  @Inject()
  ctx: Context;

  @Inject()
  captchaService: CaptchaService;

  @Get('/')
  async login(@Query(ALL) dto: GetCaptchaCodeDto) {
    return this.captchaService.getImgCaptcha(dto);
  }
}
