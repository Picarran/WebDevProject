import { Provide } from '@midwayjs/core';
import { User } from '../dto/user.dto';

export class logInMessage {
  success: boolean;
  username: string;
  description: string;
}

@Provide()
export class UserLogInService {
  async getUser(userMassage: User): Promise<logInMessage> {
    return {
      success: true,
      username: userMassage.username,
      description: '登录成功',
    };
  }
}
