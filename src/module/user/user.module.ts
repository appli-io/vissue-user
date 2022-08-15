import { Module }                   from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule }            from '@nestjs/typeorm';

import { UserController } from './controller/user.controller';
import { User }           from './entity/user.entity';
import { UserService }    from './service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
