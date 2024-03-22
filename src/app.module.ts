import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobTitlesModule } from './job-titles/job-titles.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
      isGlobal: true,
    }),
    EmployeesModule,
    DepartmentsModule,
    JobTitlesModule,
    ReviewsModule,
  ],
})
export class AppModule {}
