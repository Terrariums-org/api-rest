import { TerrariumsInterface } from "../entities";

export interface TerrariumPortRepository {
    findAll() : Promise<TerrariumsInterface[]>
}