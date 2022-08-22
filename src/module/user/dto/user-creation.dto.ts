import { ApiProperty }          from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreationDto {

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
