import { lastValueFrom, timeout }                        from 'rxjs';
import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { ClientProxy }                                   from '@nestjs/microservices';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      return await lastValueFrom(
        this.client.send(
          {role: 'auth', cmd: 'check'},
          {jwt: req.headers['authorization']?.split(' ')[1]})
          .pipe(timeout(5000))
      );
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
