import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginInterface } from '../entities';

export class CreateLoginDTO implements LoginInterface {
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  passwordUser: string;
}
