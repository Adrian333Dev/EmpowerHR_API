import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { UsersModule } from '../users/users.module';
import { EmployeesService } from './employees.service';

@Module({
  imports: [UsersModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
