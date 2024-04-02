import { CreateUserDto } from '@/domains/users/users.dto';
import { PickType } from '@nestjs/mapped-types';

export class SignUpDto extends CreateUserDto {}

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {}
