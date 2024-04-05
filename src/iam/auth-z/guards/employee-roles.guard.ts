import { APP_GUARD, Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployeeRole } from '@prisma/client';

import { EMPLOYEE_ROLES_KEY } from '../decorators/employee-roles.decorator';
import { IActiveUser } from '@/iam/interfaces';
import { REQUEST_USER_KEY } from '@/iam/iam.constants';
import { EmployeesService } from '@/domains/employees/employees.service';

@Injectable()
export class EmployeeRolesGuard implements CanActivate {
  private readonly logger = new Logger(EmployeeRolesGuard.name);
  
  constructor(
    private readonly reflector: Reflector,
    private readonly employeeService: EmployeesService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<EmployeeRole[]>(
      EMPLOYEE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    this.logger.debug(`Params: ${JSON.stringify(request.params)}`);
    
    const user: IActiveUser = request[REQUEST_USER_KEY];
    return true;
  }
}

export const EmployeeRoleGuardProvider = {
  provide: APP_GUARD,
  useClass: EmployeeRolesGuard,
} as const;
