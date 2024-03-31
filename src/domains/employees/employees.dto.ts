import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma, EmployeeRole } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateUserDto } from '../users/users.dto';

export class CreateEmployeeDto
  extends CreateUserDto
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
  department_id: number;

  @IsOptional()
  @IsEnum(EmployeeRole)
  role?: EmployeeRole;

  @IsOptional()
  @IsString()
  job_title?: string;
}

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['email', 'password']),
) {}
