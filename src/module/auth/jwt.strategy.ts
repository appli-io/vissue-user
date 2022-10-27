import { ConfigService }        from '@nestjs/config';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject }               from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload) {
    return {id: payload.sub, user: payload.user};
  }
}
