import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EmployeeCreateDto, EmployeeUpdateDto } from './dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOneById(id: number) {
    return await this.prisma.employee.findUnique({
      where: { id },
      include: { jobTitle: true, department: true, performanceReviews: true },
    });
  }

  async create({ jobTitleId, departmentId, ...data }: EmployeeCreateDto) {
    return await this.prisma.employee.create({
      data: {
        ...data,
        jobTitle: { connect: { id: jobTitleId } },
        department: { connect: { id: departmentId } },
      },
    });
  }

  async update(
    id: number,
    { jobTitleId, departmentId, ...data }: EmployeeUpdateDto,
  ) {
    const updateData: Prisma.EmployeeUpdateInput = data;
    if (jobTitleId) updateData.jobTitle = { connect: { id: jobTitleId } };
    if (departmentId) updateData.department = { connect: { id: departmentId } };
    return await this.prisma.employee.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return await this.prisma.employee.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]) {
    return await this.prisma.employee.deleteMany({
      where: { id: { in: ids } },
    });
  }

  // private async preloadJobTitle(title: string) {
  //   const jobTitle = await this.prisma.jobTitle.upsert({
  //     where: { title },
  //     update: {},
  //     create: { title },
  //   });
  //   return jobTitle;
  // }

  // private async preloadDepartment(name: string) {
  //   const department = await this.prisma.department.upsert({
  //     where: { name },
  //     update: {},
  //     create: { name },
  //   });
  //   return department;
  // }
}
