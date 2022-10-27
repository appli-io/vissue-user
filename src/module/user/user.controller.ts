import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { MessagePattern }                                                                                      from '@nestjs/microservices';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags }                                     from '@nestjs/swagger';

import { FindOneOptions } from 'typeorm';

import { AuthGuard } from '@infrastructure/common/guards/auth.guard';

import { User } from '@domain/entity/user.entity';

import { UserService }        from './user.service';
import { UserCreationDto }    from './dto/user-creation.dto';
import { infinityPagination } from '@infrastructure/utils/infinite-pagination.utils';

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

  @ApiOkResponse({description: 'Return in list all users', type: Array<User>})
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userService.findManyWithPagination({
        page,
        limit,
      }),
      {page, limit},
    );
  }

  @Get('/paginate')


  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(response: string): Promise<string> {
    return response;
  }
}
