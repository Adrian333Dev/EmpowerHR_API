import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { OrganizationsModule } from './domains/organizations/organizations.module';
import { UsersModule } from './domains/users/users.module';
import { EmployeesModule } from './domains/employees/employees.module';
import { CommonModule } from './common/common.module';
import { IamModule } from './iam/iam.module';
// import { AccessTokenGuardProvider } from './iam/auth-n/guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      // prismaServiceOptions: { middlewares: [loggingMiddleware()] },
    }),
    OrganizationsModule,
    UsersModule,
    EmployeesModule,
    CommonModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
