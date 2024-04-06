// import * as Joi from '@hapi/joi'; // TODO: Make sure to validate the environment variables later
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { OrganizationsModule } from './domains/organizations/organizations.module';
import { UsersModule } from './domains/users/users.module';
import { EmployeesModule } from './domains/employees/employees.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    OrganizationsModule,
    UsersModule,
    EmployeesModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
