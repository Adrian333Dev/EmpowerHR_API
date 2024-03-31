import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { CreateUserDto } from '../users/users.dto';

export class CreateEmployeeDto
  extends CreateUserDto
  implements Omit<Prisma.EmployeeUncheckedCreateInput, 'employee_id'>
{
  @IsNotEmpty()
  @IsPositive()
  role_id: number;

  @IsNotEmpty()
  @IsPositive()
  department_id: number;

  @IsNotEmpty()
  @IsPositive()
  org_id: number;

  @IsNotEmpty()
  @IsPositive()
  job_title_id: number;
}

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['email', 'password']),
) {}
