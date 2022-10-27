import { Module }                      from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule }                   from '@nestjs/jwt';

import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { UserService }      from '../user/user.service';
import { AuthService }      from './auth.service';
import { AuthController }   from './auth.controller';
import { JwtStrategy }      from './jwt.strategy';
import { LocalStrategy }    from './local.strategy';

@Module({
  imports: [
    ConfigModule,
    ExceptionsModule,
    JwtModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('auth.secret'),
            signOptions: {expiresIn: configService.get<string>('auth.expiration')},
          };
        },
        inject: [ConfigService]
      }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService]
})

export class AuthModule {}
