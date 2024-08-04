import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { logInMessage, UserLogInService } from '../service/user.service';
import { User } from '../dto/user.dto';

@Controller('/user')
export class UserLogIn {
  @Inject()
  UserLogInService: UserLogInService;

  @Post('/logIn')
  public async logIn(@Body() user: User): Promise<logInMessage> {
    try {
      return await this.UserLogInService.getUser(user);
    } catch (e) {
      console.log('用户名不能为空');
    }
  }
}
