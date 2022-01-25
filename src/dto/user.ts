import { Rule, RuleType } from '@midwayjs/decorator';
export class UserLoginDto {
  @Rule(RuleType.string().min(8).required())
  username: string;
  @Rule(RuleType.string().min(8).required())
  password: string;
  @Rule(RuleType.string().required())
  captcha: string;
  @Rule(RuleType.string().required())
  captchaId: string;
  @Rule(RuleType.string().required())
  client: string;
}
