import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from './users.input';
import { IFindOneOptions } from '@/common/interface';

@Injectable()
export abstract class IUsersService {
  abstract create(data: CreateUserInput): Promise<User>;
  abstract findOne(
    userId: number,
    opts?: IFindOneOptions,
  ): Promise<User | null>;
  abstract findOneByEmail(
    email: string,
    opts?: IFindOneOptions,
  ): Promise<User | null>;
}

@Injectable()
class UsersService implements IUsersService {
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

export const UsersServiceProvider = {
  provide: IUsersService,
  useClass: UsersService,
} as const;
