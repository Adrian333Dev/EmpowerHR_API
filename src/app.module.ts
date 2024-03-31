import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { OrganizationsModule } from './domains/organizations/organizations.module';
import { UsersModule } from './domains/users/users.module';
import { EmployeesModule } from './domains/employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
        prismaOptions: {
          datasources: {
            db: { url: process.env.DATABASE_URL },
          },
        },
      },
    }),
    OrganizationsModule,
    UsersModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
