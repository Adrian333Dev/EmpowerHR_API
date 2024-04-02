import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateEmployeeInput, UpdateEmployeeInput } from './employees.input';
// import { IUserService, USER_SERVICE } from '../users/users.interface';

@Injectable()
export class EmployeesService {
  // constructor(
  //   private readonly prisma: PrismaService,
  //   @Inject(USER_SERVICE) private readonly usersService: IUserService,
  // ) {}

  // async create(data: CreateEmployeeInput) {
  //   const user = await this.usersService.create(data);
  //   return this.prisma.employee.create({
  //     data: {
  //       emp_id: user.user_id,
  //       ...data,
  //     },
  //   });
  // }

  // async findAll(org_id: number) {
  //   return this.prisma.employee.findMany({ where: { org_id } });
  // }

  // async findOneById(emp_id: number) {
  //   return this.prisma.employee.findUnique({ where: { emp_id } });
  // }

  // async findOne(where: Prisma.EmployeeWhereUniqueInput) {
  //   return this.prisma.employee.findUnique({ where });
  // }

  // async update(emp_id: number, data: UpdateEmployeeInput) {
  //   return this.prisma.employee.update({
  //     where: { emp_id },
  //     data,
  //   });
  // }

  // async remove(emp_id: number) {
  //   return this.prisma.employee.delete({ where: { emp_id } });
  // }
}
