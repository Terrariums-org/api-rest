import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserProfile } from './update-user_profle';
import { TerrariumsInterface } from '../../../terrariums/domain/entities';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
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

  @ValidateNested()
  @ApiProperty()
  terrariums: TerrariumsInterface[];
}
