import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService }                            from '../service/user.service';
import { MessagePattern }                    from '@nestjs/microservices';
import { User }                              from '../entity/user.entity';
import { FindOneOptions }                    from 'typeorm';
import { AuthGuard }                         from '../guard/auth.guard';

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
