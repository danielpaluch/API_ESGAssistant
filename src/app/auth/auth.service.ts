import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  // Add checking password and credentials of user
  async signIn(email: string, password: string) : Promise<{ access_token: string }> {
    const user = await this.userService.validateUser({ email, password });

   if (!user) {
     throw new UnauthorizedException('Invalid credentials');
   }

    const { password: userPassword, ...result } = user;
    console.log('Result:', result);
    return this.logIn(result);
  }

  async logIn(user: any) {
    try {
      const payload = { sub: user._doc._id, username: user._doc.email, roles: user._doc.roles };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // Handle error appropriately
      console.error('Error in logIn:', error);
      throw new Error('Error generating access token');
    }
  }
}
