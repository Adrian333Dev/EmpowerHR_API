import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

export abstract class UserRepository {
  private readonly prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  protected findUnique(args?: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }

  protected findUniqueOrThrow(args?: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }

  protected findFirst(args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst(args);
  }

  protected findFirstOrThrow(args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst(args);
  }

  protected findMany(args?: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args);
  }

  protected create(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create(args);
  }

  protected createMany(args: Prisma.UserCreateManyArgs) {
    return this.prisma.user.createMany(args);
  }

  protected update(args: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(args);
  }

  protected updateMany(args: Prisma.UserUpdateManyArgs) {
    return this.prisma.user.updateMany(args);
  }

  protected delete(args: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(args);
  }

  protected deleteMany(args?: Prisma.UserDeleteManyArgs) {
    return this.prisma.user.deleteMany(args);
  }

  protected upsert(args: Prisma.UserUpsertArgs) {
    return this.prisma.user.upsert(args);
  }
}
