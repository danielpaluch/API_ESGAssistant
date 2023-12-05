import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userService.findOne(email);

    const isMatch = await bcrypt.compare(password, user?.password);
    if (user && isMatch) {
      return user;
    }

    return null;
  }

  login(user: User) {
    return {
      user,
      authToken: this.jwtService.sign(
        {
          email: user.email,
          sub: user._id,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }

  async signUp(payload: CreateUserInput) {
    const user = await this.userService.findOne(payload.email);

    if (user) {
      throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(
      payload.password,
      Number(this.configService.get<string>('SALT')),
    );

    return this.userService.createUser({ ...payload, password: hash });
  }
}
