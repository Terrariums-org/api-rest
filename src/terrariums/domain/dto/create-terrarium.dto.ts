import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';
import { CreateUserDto } from '../../../users/domain/dto';

export class CreateTerrariumDto {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  terrariumProfile: CreateTerrariumProfileDto;

  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  user: CreateUserDto;
}
