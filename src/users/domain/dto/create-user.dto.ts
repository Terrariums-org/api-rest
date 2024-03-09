import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { CreateUserProfile } from './create-user_profile';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  passwordUser: string;

  @IsString()
  @ApiProperty()
  email: string;
  
  @ValidateNested()
  @ApiProperty()
  userProfile: CreateUserProfile;
  constructor(
    username: string,
    email: string,
    password: string,
    userProfile: CreateUserProfile,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userProfile = userProfile;
  }
}
