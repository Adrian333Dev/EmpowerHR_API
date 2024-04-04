import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export interface IRefreshTokenStorage {
  save(userId: number, refreshToken: string): Promise<void>;
  validate(userId: number, refreshToken: string): Promise<boolean>;
  invalidate(userId: number, refreshToken: string): Promise<void>;
}

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenStorage implements IRefreshTokenStorage {
  constructor(private readonly prisma: PrismaService) {}

  async save(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: { refreshToken: { create: { token: refreshToken } } },
    });
  }

  async validate(userId: number, refreshToken: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: { refreshToken: true },
    });
    if (user?.refreshToken?.token !== refreshToken)
      throw new InvalidatedRefreshTokenError();
    return true;
  }

  async invalidate(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: { refreshToken: { delete: true } },
    });
  }
}
