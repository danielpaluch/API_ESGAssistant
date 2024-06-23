import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { registerEnumType } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';

registerEnumType(Role, { name: 'Role' });

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    ConfigModule,
    JwtModule
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
