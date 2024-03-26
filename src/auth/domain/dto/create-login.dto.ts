import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginInterface } from '../entities';

export class CreateLoginDTO implements LoginInterface {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  passwordUser: string;
}
