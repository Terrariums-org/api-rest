import { UpdateTerrariumDto } from '../dto';
import { TerrariumsInterface } from '../entities';

export interface TerrariumsServiceRepository {
  getAllService(): Promise<TerrariumsInterface[]>;
  removeService(id: number): Promise<void>;
  updateService(terrarium: UpdateTerrariumDto): Promise<TerrariumsInterface>;
}
