import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
