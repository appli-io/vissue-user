import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule }    from '@nestjs/jwt';

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
    JwtModule.register(
      {
        secret: 'vissue-key',
        signOptions: {expiresIn: '60s'}
      }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService]
})

export class AuthModule {}
