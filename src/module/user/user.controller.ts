import { Body, Controller, Get, Post, UseGuards }           from '@nestjs/common';
import { MessagePattern }                                   from '@nestjs/microservices';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { FindOneOptions } from 'typeorm';

import { AuthGuard } from '@infrastructure/common/guards/auth.guard';

import { User } from '@domain/entity/user.entity';

import { UserService }     from './user.service';
import { UserCreationDto } from './dto/user-creation.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({role: 'email', cmd: 'get'})
  getUser(data: any): Promise<User> {
    return this.userService.findOne({where: {email: data.email}} as FindOneOptions);
  }

  @ApiCreatedResponse({description: 'Return created user id', type: String})
  @ApiConflictResponse({description: 'User with email {{user.email}} already exists.'})
  @Post()
  createUser(@Body() data: UserCreationDto): Promise<any> {
    return this.userService.createUser(data as User);
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(response: string): Promise<string> {
    return response;
  }
}
