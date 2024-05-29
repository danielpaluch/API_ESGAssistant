import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  // Update find one to find by email
  // Add checking password and credentials of user
  // async signIn(username: string, pass: string): Promise<{ access_token: string }> {
  //   const user = await this.userService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.userId, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
