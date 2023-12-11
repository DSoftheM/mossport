import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { LocalStrategy } from '../strategies/local.strategy';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private localStrategy: LocalStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const credentials = this.getEmailAndPasswordFromBody(req.body);
    if (!credentials) {
      return false;
    }
    try {
      const user = await this.localStrategy.validate(credentials.email, credentials.password);
      req.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }

  private getEmailAndPasswordFromBody(body: Record<string, any>) {
    if (!body.email || !body.password) {
      return null;
    }
    return {
      email: body.email as string,
      password: body.password as string,
    };
  }
}
