import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagePattern }                         from '@nestjs/microservices';

import { User }        from '@domain/entity/user.entity';
import { AuthGuard }   from '@infrastructure/common/guards/auth.guard';
import { UserService } from '../service/user.service';

import { FindOneOptions } from 'typeorm';

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

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
