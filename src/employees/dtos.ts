import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma, Role } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class EmployeeCreateDto
  implements Omit<Prisma.EmployeeCreateInput, 'jobTitle' | 'department'>
{
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPositive()
  jobTitleId: number;

  @IsNotEmpty()
  @IsPositive()
  departmentId: number;

  @IsNumber()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsDate()
  hireDate: Date;

  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.EMPLOYEE;
}

export class EmployeeUpdateDto
  extends PartialType(
    OmitType(EmployeeCreateDto, ['name', 'email', 'hireDate'])
  )
  implements
    Omit<
      Prisma.EmployeeUpdateInput,
      'name' | 'email' | 'hireDate' | 'jobTitle' | 'department'
    > {}
