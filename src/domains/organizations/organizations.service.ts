import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EmployeeRole } from '@prisma/client';

import { CreateOrgInput, UpdateOrgInput } from './organizations.input';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  async create({ userId, ...data }: CreateOrgInput) {
    const user = await this.usersService.findOneById(userId);
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
