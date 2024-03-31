import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employees.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(data: CreateEmployeeDto) {
    const user = await this.usersService.create(data);
    return this.prisma.employee.create({
      data: {
        employee_id: user.user_id,
        ...data,
      },
    });
  }

  async findAll(org_id: number) {
    return this.prisma.employee.findMany({ where: { org_id } });
  }

  async findOneById(employee_id: number) {
    return this.prisma.employee.findUnique({ where: { employee_id } });
  }

  async findOne(where: Prisma.EmployeeWhereUniqueInput) {
    return this.prisma.employee.findUnique({ where });
  }

  async update(employee_id: number, data: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { employee_id },
      data,
    });
  }

  async remove(employee_id: number) {
    return this.prisma.employee.delete({ where: { employee_id } });
  }
}
