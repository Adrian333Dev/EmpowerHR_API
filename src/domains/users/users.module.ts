import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RefreshTokenStorage } from './refresh-token.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RefreshTokenStorage],
  exports: [UsersService, RefreshTokenStorage],
})
export class UsersModule {}
