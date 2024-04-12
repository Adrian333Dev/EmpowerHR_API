import { PickType } from '@nestjs/mapped-types';
import { CreateUserInput } from '@/domains/users/users.input';

export class SignUpInput extends CreateUserInput {}

export class SignInInput extends PickType(SignUpInput, ['email', 'password']) {}