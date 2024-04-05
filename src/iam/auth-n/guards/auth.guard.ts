import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { AUTH_TYPE_KEY } from '../decorators';
import { AuthType } from '../enums';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly logger = new Logger(AuthGuard.name);
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Checking authorization...');
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        this.logger.error(err.message);
        error = err;
      });

      if (canActivate) return true;
    }
    throw error;
  }
}

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
} as const;
