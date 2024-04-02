import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServiceProvider } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersServiceProvider],
  exports: [UsersServiceProvider],
})
export class UsersModule {}
