import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtAuthMetadata, User } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractJwtTokenFromHeaders(req.headers);
    if (token) {
      try {
        const { iat, exp, sub, ...user } = await this.jwtService.verifyAsync<User & JwtAuthMetadata>(token);
        req.user = user;
        return true;
      } catch (_error) {
        const error = _error as TokenExpiredError;
        throw new HttpException(error.name, HttpStatus.FORBIDDEN, { cause: error });
      }
    }
    return false;
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
