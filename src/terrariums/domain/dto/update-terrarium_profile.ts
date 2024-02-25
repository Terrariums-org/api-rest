import { PartialType } from '@nestjs/mapped-types';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';

export class UpdateTerrariumProfile extends PartialType(
  CreateTerrariumProfileDto,
) {}
