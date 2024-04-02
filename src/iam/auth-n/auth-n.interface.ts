import { User } from '@prisma/client';

export interface IUserOutput extends Omit<User, 'password'> {}
