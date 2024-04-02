import { Module } from '@nestjs/common';
import { AuthNModule } from './auth-n/auth-n.module';
import { AuthZModule } from './auth-z/auth-z.module';

@Module({
  imports: [AuthNModule, AuthZModule],
  providers: [],
})
export class IamModule {}
