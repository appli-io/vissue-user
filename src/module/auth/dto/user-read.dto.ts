import { User } from '@domain/entity/user.entity';

export class UserReadDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, email: string, firstName: string, lastName: string, password: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromUser(user: User): UserReadDto {
    if (!user) return null;
    return new UserReadDto(user.id, user.email, user.firstName, user.lastName, user.password, user.createdAt, user.updatedAt);
  }
}
