import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateEmployeeInput, UpdateEmployeeInput } from './employees.input';
import { IFindOneOptions } from '@/common/interface';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmployeeInput) {
    return await this.prisma.employee.create({ data });
  }

  async findOne(params: Prisma.EmployeeFindUniqueArgs, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.employee.findUniqueOrThrow(params);
    return this.prisma.employee.findUnique(params);
  }

  async findOneById(empId: number, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.employee.findUniqueOrThrow({ where: { empId } });
    return this.prisma.employee.findUnique({ where: { empId } });
  }

  async findOneByUser(userId: number, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.employee.findFirstOrThrow({ where: { userId } });
    return this.prisma.employee.findFirst({ where: { userId } });
  }
}