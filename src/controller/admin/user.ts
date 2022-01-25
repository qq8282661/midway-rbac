import { Inject, Controller, Post, Provide, Body, ALL, Validate } from '@midwayjs/decorator';
import { Context } from 'egg';

import { UserLoginDto } from '../../dto/user';
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
}
