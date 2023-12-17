import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/users/users.service';

export enum Role {
  Coach = 'coach',
  Sportsman = 'Sportsman',
}

export function SetRoles(...roles: Role[]) {
  return SetMetadata('role', roles);
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>('role', [context.getHandler()]);
    if (!requiredRoles) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const currentRoles = (req.user as User)?.roles ?? [];

    const atLeastOneMatch = requiredRoles.some((requiredRole) => currentRoles.includes(requiredRole));
    if (atLeastOneMatch) {
      return true;
    }
    throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
  }
}
