import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class ReviewCreateDto
  implements Omit<Prisma.PerformanceReviewCreateInput, 'employee'>
{
  @IsOptional()
  @IsDate()
  date: string | Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  comments?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  employeeId: number;
}

export class ReviewUpdateDto
  extends PartialType(
    PickType(ReviewCreateDto, ['title', 'comments'] as const),
  )
  implements Omit<Prisma.PerformanceReviewUpdateInput, 'employee'> {}