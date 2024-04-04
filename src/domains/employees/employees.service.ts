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
  //       empId: user.userId,
  //       ...data,
  //     },
  //   });
  // }

  // async findAll(orgId: number) {
  //   return this.prisma.employee.findMany({ where: { orgId } });
  // }

  // async findOneById(empId: number) {
  //   return this.prisma.employee.findUnique({ where: { empId } });
  // }

  // async findOne(where: Prisma.EmployeeWhereUniqueInput) {
  //   return this.prisma.employee.findUnique({ where });
  // }

  // async update(empId: number, data: UpdateEmployeeInput) {
  //   return this.prisma.employee.update({
  //     where: { empId },
  //     data,
  //   });
  // }

  // async remove(empId: number) {
  //   return this.prisma.employee.delete({ where: { empId } });
  // }
}
