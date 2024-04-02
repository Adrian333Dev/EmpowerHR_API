import { CreateUserInput } from '@/domains/users/users.input';
import { PickType } from '@nestjs/mapped-types';


export class SignUpInput extends CreateUserInput {}

export class SignInInput extends PickType(SignUpInput, ['email', 'password']) {}

