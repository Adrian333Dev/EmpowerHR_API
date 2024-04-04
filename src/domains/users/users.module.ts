import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServiceProvider } from './users.service';
import { RefreshTokenStorage } from './refresh-token.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersServiceProvider, RefreshTokenStorage],
  exports: [UsersServiceProvider, RefreshTokenStorage],
})
export class UsersModule {}
