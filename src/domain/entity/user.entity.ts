import { UserInterface } from '../interfaces/user.interface';

import { genSalt, hash }    from 'bcrypt';
import {
  IsEmail,
  Min
}                           from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
}                           from 'typeorm';
import { AuthProviderEnum } from '@domain/enum/auth-provider.enum';

@Entity('user')
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Min(8)
  password: string;

  @Index()
  @Column({nullable: true})
  firstName: string | null;

  @Index()
  @Column({nullable: true})
  lastName: string | null;

  @Column({nullable: true, unique: true})
  @IsEmail()
  email: string | null;
  @Column({default: AuthProviderEnum.EMAIL})
  provider: string;
  @Index()
  @Column({nullable: true})
  socialId: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
