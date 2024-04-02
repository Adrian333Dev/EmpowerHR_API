import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export abstract class IUserService {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User | null>;
}

@Injectable()
class UserService implements IUserService {
  private userRepo: UserRepository;
  constructor(prisma: PrismaService) {
    this.userRepo = new UserRepository(prisma);
  }

  async create(data: CreateUserDto) {
    return this.userRepo.create({ data });
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findUnique({ where: { email } });
  }
}

export const UsersServiceProvider = {
  provide: IUserService,
  useClass: UserService,
} as const;
