import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { LoginUserInput } from '../user/dto/login-user.input';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Query(() => User, { name: 'login' })
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
