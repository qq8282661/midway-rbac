import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import { UserLoginDto } from '../dto/user';
import { IUserOptions } from '../interface';
import { HttpException } from '../common/http-exception';
import { Utils } from '../common/utils';
import { User } from '../model/user';

import { CaptchaService } from './captcha';
import { AuthService } from './auth';
@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  @Inject()
  captchaService: CaptchaService;
  @Inject()
  utils: Utils;
  @Inject()
  authService: AuthService;
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async login(params: UserLoginDto) {
    await this.captchaService.checkImgCaptcha(params.captchaId, params.captcha);
    const user = await this.checkStudentPassword(params.username, params.password);
    const token = await this.authService.createToken({ ...user, ...params });
    return { user, token };
  }
  async checkStudentPassword(username: string, password: string) {
    const fundOne = await this.userModel.findOne({ username });
    if (!fundOne) throw new HttpException(10003);
    const currentHash = await this.utils.pbkdf2(password, fundOne.salt);
    if (currentHash !== fundOne.passwordHash) {
      throw new HttpException(10003);
    }
    return fundOne;
  }
}
