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

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Password or email address incorrect');
    }

    return user;
  }

  login(user: User) {
    return {
      user,
      authToken: this.jwtService.sign(
        {
          email: user.email,
          firstName: user.firstName,
          sub: user._id,
        },
        {
          secret:
            this.configService.get<string>('JWT_SECRET') || 'testingEnvSecret',
        },
      ),
    };
  }

  async signUp(createUserInput: CreateUserInput) {
    const user = await this.userService.getUserByEmail(createUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(
      createUserInput.password,
      Number(this.configService.get<string>('SALT_ROUNDS')),
    );

    const createdUser = await this.userService.createUser({
      ...createUserInput,
      password: hash,
    });

    return createdUser;
  }
}
