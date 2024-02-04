import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
