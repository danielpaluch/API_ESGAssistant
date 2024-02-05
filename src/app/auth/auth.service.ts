import { Injectable } from '@nestjs/common';
import { LoginUserInput } from '../user/dto/login-user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginUserInput: LoginUserInput) {
    console.log('loginUserInput', loginUserInput);
    return true;
  }
}
