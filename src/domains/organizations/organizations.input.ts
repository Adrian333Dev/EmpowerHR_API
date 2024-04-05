import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrgInput implements Prisma.OrganizationCreateInput {
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateOrgInput extends PartialType(
  OmitType(CreateOrgInput, ['userId']),
) {}

export class GiveUpOwnershipInput {
  @IsNotEmpty()
  @IsPositive()
  newOwnerId: number;
}

