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
  implements Prisma.EmployeeUncheckedCreateInput
{
  @IsNotEmpty()
  @IsPositive()
  orgId: number;

  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsPositive()
  deptId: number;

  @IsOptional()
  @IsEnum(EmployeeRole)
  role?: EmployeeRole;

  @IsOptional()
  @IsString()
  jobTitle?: string;
}

export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {}
