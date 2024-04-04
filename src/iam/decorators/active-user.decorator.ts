import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IActiveUser } from '../interfaces';
import { REQUEST_USER_KEY } from '../iam.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUser | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
