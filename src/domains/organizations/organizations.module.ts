import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsServiceProvider } from './organizations.service';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [UsersModule, EmployeesModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsServiceProvider],
  exports: [OrganizationsServiceProvider],
})
export class OrganizationsModule {}
