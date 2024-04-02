import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

export class UserRepository {
  private readonly prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  public findUnique(args?: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }

  public findUniqueOrThrow(args?: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }

  public findFirst(args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst(args);
  }

  public findFirstOrThrow(args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst(args);
  }

  public findMany(args?: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args);
  }

  public create(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create(args);
  }

  public createMany(args: Prisma.UserCreateManyArgs) {
    return this.prisma.user.createMany(args);
  }

  public update(args: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(args);
  }

  public updateMany(args: Prisma.UserUpdateManyArgs) {
    return this.prisma.user.updateMany(args);
  }

  public delete(args: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(args);
  }

  public deleteMany(args?: Prisma.UserDeleteManyArgs) {
    return this.prisma.user.deleteMany(args);
  }

  public upsert(args: Prisma.UserUpsertArgs) {
    return this.prisma.user.upsert(args);
  }
}
