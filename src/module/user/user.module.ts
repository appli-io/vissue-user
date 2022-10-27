import { Global, Module } from '@nestjs/common';
import { TypeOrmModule }  from '@nestjs/typeorm';

import { User }                        from '@domain/entity/user.entity';
import { AuthService }                 from '../auth/auth.service';
import { UserController }              from './user.controller';
import { UserService }                 from './user.service';
import { JwtModule }                   from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule.forFeature([User])]
})
export class UserModule {}
