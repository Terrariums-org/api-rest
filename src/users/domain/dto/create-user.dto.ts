import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
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
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ApiProperty()
    userProfile: CreateUserProfile;

  @ValidateNested()
  @IsOptional()
  @ApiProperty()
    terrariums?: TerrariumsInterface[];
}
