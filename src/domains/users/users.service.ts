import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService extends UserRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createUser(data: CreateUserDto) {
    return super.create({ data });
  }

  async updateUser(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    return super.update({ where, data });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return super.delete({ where });
  }
}
