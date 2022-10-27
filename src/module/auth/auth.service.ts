import { forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService }                                                    from '@nestjs/jwt';
import { compareSync }                                                   from 'bcrypt';
import { FindOneOptions }                                                from 'typeorm';

import { ERROR_CONSTANTS } from '@domain/constant/error.constant';
import { User }            from '@domain/entity/user.entity';
import { UserService }     from '../user/user.service';
import { UserReadDto }     from './dto/user-read.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      // Go to user microservice to get user by email
      console.log(await this.getUserByEmail(email));
      const user: UserReadDto = UserReadDto.fromUser(await this.getUserByEmail(email));

      // If user not found
      if (!user) throw new UnauthorizedException('Invalid credentials', {
        code: ERROR_CONSTANTS.USER_NOT_FOUND,
        message: 'User does not exist'
      } as any);

      // If password is incorrect
      if (!compareSync(password, user?.password)) throw new UnauthorizedException('Invalid credentials');

      // Delete password from result
      delete user.password;
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async login(user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...result} = user;
    const payload = {result, sub: user.id};

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  /**
   * Send message pattern to userClient to get user by email
   *
   * @param email
   * @returns {Promise<User>}
   */
  getUserByEmail = (email: string): Promise<User> => this.userService.findOne({where: {email}} as FindOneOptions);
}
