import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository }                         from '@nestjs/typeorm';
import { User }                                     from '../entity/user.entity';
import { FindOneOptions, InsertResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findOne(query: FindOneOptions): Promise<User> {
    Logger.log("query", query)
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      /**
       * Perform all needed checks
       */

      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user', res);

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}
