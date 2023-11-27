import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }
}
