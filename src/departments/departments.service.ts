import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DepartmentCreateDto, DepartmentUpdateDto } from './dtos';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.department.findMany();
  }

  async findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  async create({ parentId, name }: DepartmentCreateDto) {
    return this.prisma.department.create({
      data: {
        name,
        ...(parentId && { parent: { connect: { id: parentId } } }),
      },
    });
  }

  async update(id: number, {
    parentId,
    name,

  }: DepartmentUpdateDto) {
    return this.prisma.department.update({
      where: { id },
      data: {
        name,
        ...(parentId && { parent: { connect: { id: parentId } } }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}
