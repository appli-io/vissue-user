import { Global, Module } from '@nestjs/common';
import { TypeOrmModule }  from '@nestjs/typeorm';

import { User }           from '@domain/entity/user.entity';
import { AuthService }    from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService }    from './user.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule.forFeature([User])]
})
export class UserModule {}
