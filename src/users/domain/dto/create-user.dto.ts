import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserProfile } from './create-user_profile';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmptyObject()
  @ValidateNested()
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
