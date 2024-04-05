import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [UsersModule, EmployeesModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
