import { IsInt, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserProfile } from './update-user_profle';

export class CreateUserDto {
  @IsInt()
  @ApiProperty()
  id: number;

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
  userProfile: UpdateUserProfile;
}
