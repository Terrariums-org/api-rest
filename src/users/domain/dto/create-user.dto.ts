import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TerrariumsInterface } from '../../../terrariums/domain/entities';
import { CreateUserProfile } from './create-user_profile';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  passwordUser: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ValidateNested()
  @ApiProperty()
  userProfile: CreateUserProfile;

  @ValidateNested()
  @IsOptional()
  @ApiProperty()
  terrariums?: TerrariumsInterface[];
}
