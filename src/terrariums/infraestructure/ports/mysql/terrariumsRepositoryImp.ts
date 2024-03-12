import { Injectable } from "@nestjs/common";
import { TerrariumsInterface } from "src/terrariums/domain/entities";
import { TerrariumPortRepository } from "src/terrariums/domain/repositories/terrariumPortRepository";

@Injectable()
export class TerrariumsRepositoryImp  implements TerrariumPortRepository{
    findAll(): Promise<TerrariumsInterface[]> {
        throw new Error("Method not implemented.");
    }

}