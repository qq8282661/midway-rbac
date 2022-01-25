import { Provide } from '@midwayjs/decorator';
import { nanoid } from 'nanoid';
import * as svgCaptcha from 'svg-captcha';

import { HttpException } from '../common/http-exception';
import { GetCaptchaCodeDto } from '../dto/captcha';

import { BaseService } from './base';

@Provide()
export class CaptchaService extends BaseService {
  async getImgCaptcha(captcha: GetCaptchaCodeDto) {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 2,
      width: captcha.width ?? 100,
      height: captcha.width ?? 100,
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: nanoid(),
    };

    // 10分钟过期时间
    await this.redisService.set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 10);
    return result;
  }
  async checkImgCaptcha(id: string, code: string): Promise<boolean> {
    const result = await this.redisService.get(`admin:captcha:img:${id}`);
    if (!result) {
      throw new HttpException(40003);
    }
    if (code.toLowerCase() !== result!.toLowerCase()) {
      throw new HttpException(40003);
    }
    // 校验成功后移除验证码
    await this.redisService.del(`admin:captcha:img:${id}`);
    return true;
  }
}
