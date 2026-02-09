/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/users/enum/role.enum';

export const ROLES_KEY = 'roles';
// export const Roles = (...roles:ROLE[]=> Set)
export const Roles = (...roles:ROLE[])=>SetMetadata(ROLES_KEY,roles);

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return data ? user?.[data] : user;
  },
);