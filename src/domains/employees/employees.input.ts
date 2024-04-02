import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma, EmployeeRole } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateUserInput } from '../users/users.input';

export class CreateEmployeeInput
  extends CreateUserInput
  implements Prisma.EmployeeUncheckedCreateInput
{

  @IsNotEmpty()
  @IsPositive()
  org_id: number;

  @IsNotEmpty()
  @IsPositive()
  user_id: number;

  @IsNotEmpty()
  @IsPositive()
  dept_id: number;

  @IsOptional()
  @IsEnum(EmployeeRole)
  role?: EmployeeRole;

  @IsOptional()
  @IsString()
  job_title?: string;
}

export class UpdateEmployeeInput extends PartialType(
  OmitType(CreateEmployeeInput, ['email', 'password']),
) {}
