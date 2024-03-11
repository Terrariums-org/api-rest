import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';
import { CreateUserDto} from 'src/users/domain/dto';

export class CreateTerrariumDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  terrarium_profile: CreateTerrariumProfileDto;

  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  user: CreateUserDto;
}
