import { AuthNController } from './auth-n/auth-n.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config';
import { ConfigModule } from '@nestjs/config';
import { HashingServiceProvider } from './hashing';
import { AccessTokenGuard, AuthGuardProvider } from './auth-n/guards';
import { AuthNServiceProvider } from './auth-n/auth-n.service';
import { UsersModule } from '@/domains/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UsersModule,
  ],
  providers: [
    HashingServiceProvider,
    AuthNServiceProvider,
    AuthGuardProvider,
    AccessTokenGuard,
  ],
  controllers: [AuthNController],
})
export class IamModule {}
