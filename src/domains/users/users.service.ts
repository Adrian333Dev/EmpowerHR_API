import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const password_hash = data.password;
    return this.prisma.user.create({ data: { ...data, password_hash } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOneById(user_id: number) {
    return this.prisma.user.findUnique({ where: { user_id } });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  async update(user_id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { user_id },
      data,
    });
  }

  async remove(user_id: number) {
    return this.prisma.user.delete({ where: { user_id } });
  }
}
