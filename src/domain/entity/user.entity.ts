import { UserInterface } from '../interfaces/user.interface';

import { hash }                                                                                             from 'bcrypt';
import { IsEmail, Min }                                                                                                 from 'class-validator';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('user')
@Unique(['email'])
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Min(8)
  password: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
