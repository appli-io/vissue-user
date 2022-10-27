import { CanActivate, ExecutionContext, forwardRef, Inject, Logger } from '@nestjs/common';
import { AuthService }                                               from '../../../module/auth/auth.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      return this.authService.validateToken(
        req.headers['authorization']?.split(' ')[1]);
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
