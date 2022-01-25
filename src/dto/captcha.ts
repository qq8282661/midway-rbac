import { Rule, RuleType } from '@midwayjs/decorator';
export class GetCaptchaCodeDto {
  // 验证码宽度
  @Rule(RuleType.number().integer())
  width: number;
  // 验证码高度
  @Rule(RuleType.number().integer())
  height: number;
}
