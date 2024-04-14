import { UpdateTerrariumDto } from '../dto';
import { TerrariumsInterface } from '../entities';

export interface TerrariumPortRepository {
    findAllByOption(options : UpdateTerrariumDto) : Promise<TerrariumsInterface[]>;
    findOneByOption(id : number) : Promise<TerrariumsInterface>;
}
