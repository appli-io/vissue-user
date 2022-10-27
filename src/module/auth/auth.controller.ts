import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService }                                  from './auth.service';
import { LocalAuthGuard }                               from './guards/local-auth.guard';
import { MessagePattern }                               from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @MessagePattern({role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
