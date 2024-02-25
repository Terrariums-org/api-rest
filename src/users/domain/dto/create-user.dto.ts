import { IsString, ValidateNested } from 'class-validator';
import { CreateUserProfile } from './create-user_profile';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @ValidateNested()
  userProfile: CreateUserProfile;
}
