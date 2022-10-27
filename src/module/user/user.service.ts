import { ConflictException, Injectable, Logger }     from '@nestjs/common';
import { InjectRepository }                          from '@nestjs/typeorm';
import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

import { User }              from '@domain/entity/user.entity';
import { PaginationOptions } from '@domain/interfaces/pagination-options.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  findManyWithPagination(paginationOptions: PaginationOptions): Promise<User[]> {
    return this.userRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(query: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<ObjectLiteral> {
    try {
      const checkUser = await this.userRepository.findOne({where: {email: user.email}});

      if (checkUser)
        throw new ConflictException(`User with email ${ user.email } already exists.`);

      const userEntity = this.userRepository.create(user);

      return (await this.userRepository.insert(userEntity)).identifiers[0];
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
