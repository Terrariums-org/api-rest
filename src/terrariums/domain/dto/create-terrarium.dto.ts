import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/infraestructure/ports/mysql/user.entity';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';
import { UserProfile } from 'src/users/infraestructure/ports/mysql/user_profile.entity';
import { CreateUserDto, CreateUserProfile } from 'src/users/domain/dto';

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
  user: CreateUserDto;
}
