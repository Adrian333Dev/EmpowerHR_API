import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from '@/domains/users/users.input';

export class SignUpInput extends CreateUserInput {}

export class SignInInput extends PickType(SignUpInput, ['email', 'password']) {}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
