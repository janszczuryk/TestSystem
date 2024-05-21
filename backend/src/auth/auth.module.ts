import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountModule } from '@module/account/account.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './jwt-options.factory';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService }), PassportModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
