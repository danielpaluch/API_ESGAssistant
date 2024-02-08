import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginUserInput } from '../user/dto/login-user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly ISSUER_BASE_URL: string;
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly AUDIENCE: string;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.ISSUER_BASE_URL = this.configService.get('ISSUER_BASE_URL');
    this.CLIENT_ID = this.configService.get('CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get('CLIENT_SECRET');
    this.AUDIENCE = this.configService.get('AUDIENCE');
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.validateUser(loginUserInput);

    if (!user) {
      return user;
    }

    // Get body from user object
    const access_token = await this.getAuthAccessToken();

    return { access_token };
  }

  async getAuthAccessToken() {
    const url = `${this.ISSUER_BASE_URL}oauth/token`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = {
      grant_type: 'client_credentials',
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      audience: this.AUDIENCE,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: new URLSearchParams(body),
    });
    const data = await response.json();
    return data.access_token;
  }
}
