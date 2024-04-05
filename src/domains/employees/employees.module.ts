import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { UsersModule } from '../users/users.module';
import { EmployeesServiceProvider } from './employees.service';

@Module({
  imports: [UsersModule],
  controllers: [EmployeesController],
  providers: [EmployeesServiceProvider],
  exports: [EmployeesServiceProvider],
})
export class EmployeesModule {}
