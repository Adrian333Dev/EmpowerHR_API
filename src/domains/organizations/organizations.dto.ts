import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrgDto implements Prisma.OrganizationCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}


export class UpdateOrgDto extends PartialType(CreateOrgDto) {}
