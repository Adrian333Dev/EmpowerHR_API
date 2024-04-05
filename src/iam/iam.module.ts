import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig } from './config';
import { UsersModule } from '@/domains/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UsersModule,
  ],
  providers: [],
  controllers: [],
})
export class IamModule {}
