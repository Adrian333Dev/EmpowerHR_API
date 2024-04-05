import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EmployeeRole, Organization, Prisma } from '@prisma/client';

import { CreateOrgInput, UpdateOrgInput } from './organizations.input';
import { IUsersService } from '../users/users.service';
import { IEmployeesService } from '../employees/employees.service';

@Injectable()
export abstract class IOrganizationsService {
  abstract create(data: CreateOrgInput): Promise<Organization>;
}

@Injectable()
class OrganizationsService implements IOrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: IUsersService,
    private readonly employeesService: IEmployeesService,
  ) {}

  async create({ userId, ...data }: CreateOrgInput) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.prisma.$transaction(async (prisma) => {
      const org = await prisma.organization.create({
        data: {
          ...data,
          departments: {
            create: { name: 'Root', description: 'Root department' },
          },
        },
        include: { departments: true },
      });

      await this.employeesService.create({
        orgId: org.orgId,
        userId: user.userId,
        deptId: org.departments[0].deptId,
        role: EmployeeRole.OWNER,
      });

      return org;
    });
  }
}

export const OrganizationsServiceProvider = {
  provide: IOrganizationsService,
  useClass: OrganizationsService,
} as const;
