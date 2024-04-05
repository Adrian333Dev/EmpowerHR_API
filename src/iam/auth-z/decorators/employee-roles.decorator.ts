import { SetMetadata } from '@nestjs/common';
import { EmployeeRole } from '@prisma/client';

export const EMPLOYEE_ROLES_KEY = 'employeeRoles';
export const EmployeeRoles = (...roles: EmployeeRole[]) => SetMetadata(EMPLOYEE_ROLES_KEY, roles);