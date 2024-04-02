import { Module } from '@nestjs/common';
import { AuthZService } from './auth-z.service';

@Module({
  providers: [AuthZService]
})
export class AuthZModule {}
