import { Body, Controller, Post } from '@nestjs/common';
import { UserService }            from '../service/user.service';
import { MessagePattern }         from '@nestjs/microservices';
import { User }                   from '../entity/user.entity';
import { FindOneOptions }         from 'typeorm';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({role: 'email', cmd: 'get'})
  getUser(data: any): Promise<User> {
    return this.userService.findOne({where: {email: data.email}} as FindOneOptions);
  }

  @Post('/user')
  createUser(@Body() data: User): Promise<any> {
    console.log(data);
    return this.userService.createUser(data as User);
  }
}
