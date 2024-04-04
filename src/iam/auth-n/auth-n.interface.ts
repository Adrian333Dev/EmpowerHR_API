import { User } from '@prisma/client';

export interface IUserOutput extends Omit<User, 'password'> {}

export interface IAccessTokenPayload {
  email: string;
}

export interface IRefreshTokenPayload {
  refreshTokenId: string;
}