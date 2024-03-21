import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobTitlesModule } from './job-titles/job-titles.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PrismaModule, EmployeesModule, DepartmentsModule, JobTitlesModule, ReviewsModule],
})
export class AppModule {}
