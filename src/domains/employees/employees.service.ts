import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Employee, Prisma } from '@prisma/client';
import { CreateEmployeeInput, UpdateEmployeeInput } from './employees.input';
import { IUsersService } from '@/domains/users/users.service';

@Injectable()
export abstract class IEmployeesService {
  abstract create(data: CreateEmployeeInput): Promise<Employee>;
}

@Injectable()
class EmployeesService implements IEmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmployeeInput) {
    return await this.prisma.employee.create({ data });
  }
}

export const EmployeesServiceProvider = {
  provide: IEmployeesService,
  useClass: EmployeesService,
} as const;