import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DepartmentCreateDto
  implements Omit<Prisma.DepartmentCreateInput, 'employees'>
{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsPositive()
  parentId?: number;
}

export class DepartmentUpdateDto
  extends PartialType(DepartmentCreateDto)
  implements Omit<Prisma.DepartmentUpdateInput, 'employees'> {}
