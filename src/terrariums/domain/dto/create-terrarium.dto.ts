import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';
import {  UpdateUserDto } from '../../../users/domain/dto';
import { TerrariumsInterface } from '../entities';

export class CreateTerrariumDto implements TerrariumsInterface{
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
    codeEsp: string;
  @IsInt()
  @IsOptional()
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
    user: UpdateUserDto;
}
