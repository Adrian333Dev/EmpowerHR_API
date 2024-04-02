import { Module } from '@nestjs/common';
import { AuthNServiceProvider } from './auth-n.service';
import { UsersModule } from '@/domains/users/users.module';
import { HashingModule } from '../hashing';
import { AuthNController } from './auth-n.controller';

@Module({
  imports: [UsersModule, HashingModule],
  providers: [AuthNServiceProvider],
  controllers: [AuthNController],
})
export class AuthNModule {}
