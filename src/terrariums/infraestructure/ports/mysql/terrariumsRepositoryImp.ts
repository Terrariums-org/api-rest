import { Injectable } from '@nestjs/common';
import { TerrariumsInterface } from '../../../domain/entities';
import { TerrariumPortRepository } from '../../../domain/repositories/terrariumPortRepository';

@Injectable()
export class TerrariumsRepositoryImp implements TerrariumPortRepository {
  findAll(): Promise<TerrariumsInterface[]> {
    throw new Error('Method not implemented.');
  }
}
