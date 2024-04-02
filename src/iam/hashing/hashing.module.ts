import { Module } from '@nestjs/common';
import { HashingServiceProvider } from './bcrypt.service';

@Module({
  providers: [HashingServiceProvider],
  exports: [HashingServiceProvider],
})
export class HashingModule {}
