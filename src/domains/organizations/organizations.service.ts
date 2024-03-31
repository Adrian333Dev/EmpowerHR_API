import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrgDto, UpdateOrgDto } from './organizations.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateOrgDto) {
    return this.prismaService.organization.create({ data });
    // try {
    //   return await this.prismaService.organization.create({ data });
    // } catch (error) {
    //   this.logger.error(error);
    // }
  }

  async findAll() {
    return this.prismaService.organization.findMany();
  }

  async findOneById(org_id: number) {
    return this.prismaService.organization.findUnique({ where: { org_id } });
  }

  async findOne(where: Prisma.OrganizationWhereUniqueInput) {
    return this.prismaService.organization.findUnique({ where });
  }

  async update(org_id: number, data: UpdateOrgDto) {
    return this.prismaService.organization.update({
      where: { org_id },
      data,
    });
  }

  async remove(org_id: number) {
    return this.prismaService.organization.delete({ where: { org_id } });
  }
}
