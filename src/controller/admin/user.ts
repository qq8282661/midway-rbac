import { Inject, Controller, Post, Provide, Body, ALL, Validate } from '@midwayjs/decorator';
import { Context } from 'egg';

import { UserLoginDto, UserRegisterDto } from '../../dto/user';
import { UserService } from '../../service/user';
import { BaseController } from '../base';

@Provide()
@Controller('/admin/user')
export class UserController extends BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  @Validate()
  async login(@Body(ALL) dto: UserLoginDto) {
    const data = await this.userService.login(dto);
    return this.success(data);
  }

  @Post('/register')
  async register(@Body(ALL) dto: UserRegisterDto) {
    const user = await this.userService.register(dto);
    return this.resp({ data: user, code: 201 });
  }
}
