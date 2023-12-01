import { Module } from '@nestjs/common';
import { usersProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
