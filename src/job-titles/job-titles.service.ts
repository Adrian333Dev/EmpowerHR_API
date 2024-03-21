import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  JobTitleCreateDto,
  JobTitleCreateManyDto,
  JobTitleUpdateDto,
} from './dtos';

@Injectable()
export class JobTitlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.jobTitle.findMany();
  }

  async findOneById(id: number) {
    return await this.prisma.jobTitle.findUnique({
      where: { id },
    });
  }

  async create(data: JobTitleCreateDto) {
    return await this.prisma.jobTitle.create({
      data,
    });
  }

  async createMany({ departmentId, titles }: JobTitleCreateManyDto) {
    return await this.prisma.jobTitle.createMany({
      data: titles.map((title) => ({
        title,
        departmentId,
      })),
    });
  }

  async update(id: number, { title, departmentId }: JobTitleUpdateDto) {
    return await this.prisma.jobTitle.update({
      where: { id },
      data: {
        title,
      ...(departmentId && { departmentId }),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.jobTitle.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]) {
    return await this.prisma.jobTitle.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
