import { PartialType } from '@nestjs/mapped-types';
import { CreateTerrariumDto } from './create-terrarium.dto';

export class UpdateTerrariumDto extends PartialType(CreateTerrariumDto) {}
