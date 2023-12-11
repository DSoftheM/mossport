import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isPublic(context)) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractJwtTokenFromHeaders(req.headers);
    if (token) {
      const payload = this.jwtService.verifyAsync(token);
      req.user = payload;
    }
    return true;
  }

  private extractJwtTokenFromHeaders(headers: IncomingHttpHeaders) {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>('isPublic', [context.getHandler()]);
    return isPublic ?? false;
  }
}
