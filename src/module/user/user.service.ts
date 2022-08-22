import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository }                      from '@nestjs/typeorm';

import { User } from '@domain/entity/user.entity';

import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findOne(query: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<ObjectLiteral> {
    try {
      const checkUser = await this.userRepository.findOne({where: {email: user.email}});

      console.log(checkUser);
      if (checkUser)
        throw new ConflictException(`User with email ${user.email} already exists.`)

      const userEntity = this.userRepository.create(user);

      return (await this.userRepository.insert(userEntity)).identifiers[0];
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}
