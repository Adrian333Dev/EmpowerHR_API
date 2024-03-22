import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ReviewCreateDto, ReviewUpdateDto } from './dtos';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByEmployeeId(id: number) {
    return await this.prisma.performanceReview.findMany({
      where: { employeeId: id },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.performanceReview.findUnique({
      where: { id },
    });
  }

  async create(data: ReviewCreateDto) {
    return await this.prisma.performanceReview.create({
      data,
    });
  }

  async update(id: number, data: ReviewUpdateDto) {
    return await this.prisma.performanceReview.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.performanceReview.delete({
      where: { id },
    });
  }

  async removeMany(employeeId: number, reviewIds: number[]) {
    return await this.prisma.performanceReview.deleteMany({
      where: {
        id: { in: reviewIds },
        employeeId,
      },
    });
  }
}
