import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class JobTitleCreateDto
  implements Omit<Prisma.JobTitleCreateInput, 'employees' | 'department'>
{
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsPositive()
  departmentId: number;
}

export class JobTitleCreateManyDto {
  @IsNotEmpty()
  @IsPositive()
  departmentId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(50, { each: true })
  titles: string[];
}

export class JobTitleUpdateDto
  extends PartialType(JobTitleCreateDto)
  implements Omit<Prisma.JobTitleUpdateInput, 'employees' | 'department'> {}
