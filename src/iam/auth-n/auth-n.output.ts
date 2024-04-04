import { Expose } from 'class-transformer';
import { IUserOutput } from './auth-n.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpOutput implements IUserOutput {
  @Expose()
  userId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;
}

export class SignInOutput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}