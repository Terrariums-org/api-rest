import { Repository } from 'typeorm';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import { Terrariums } from '../../infraestructure/ports/mysql';

export interface TerrariumPortRepository extends Repository<Terrariums> {
  this: Repository<Terrariums>;
  findAllByOption(options: UpdateTerrariumDto): Promise<TerrariumsInterface[]>;
  findOneByOption(options: UpdateTerrariumDto): Promise<TerrariumsInterface>;
}
