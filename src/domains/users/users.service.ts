import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateUserInput, UpdateUserInput } from './users.input';
import { IFindOneOptions } from '@/common/interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(userId: number, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.user.findUniqueOrThrow({ where: { userId } });
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async findOneByEmail(email: string, opts?: IFindOneOptions) {
    if (opts?.throwOnNotFound)
      return this.prisma.user.findUniqueOrThrow({ where: { email } });
    return this.prisma.user.findUnique({ where: { email } });
  }
}
