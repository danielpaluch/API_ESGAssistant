import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Controller('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInInput) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @UseGuards(GqlAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
