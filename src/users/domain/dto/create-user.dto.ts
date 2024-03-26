import {
  IsEmail,
  IsInt,
  IsNotEmpty,
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
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  passwordUser: string;

  @IsString()
  @IsNotEmpty()
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
