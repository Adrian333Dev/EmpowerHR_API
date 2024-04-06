import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/domains/users/users.module';

const strategies = [AccessTokenStrategy, RefreshTokenStrategy];

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UsersModule,
  ],
  providers: [AuthService, ...strategies],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
