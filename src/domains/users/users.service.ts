import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateUserInput, UpdateUserInput } from './users.input';
import { IFindOneOptions } from '@/common/interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(params: Prisma.UserFindUniqueArgs, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.user.findUniqueOrThrow(params);
    return this.prisma.user.findUnique(params);
  }

  async findOneById(userId: number, opts?: IFindOneOptions) {
    return this.findOne({ where: { userId } }, opts);
  }

  async update(params: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(params);
  }
}
