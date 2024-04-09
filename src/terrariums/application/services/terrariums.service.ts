import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomError } from '../../../shared/config/application/utils';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import {
  Terrariums,
  TerrariumsProfile,
} from 'src/terrariums/infraestructure/ports/mysql';
import { terrariumsProfileRepositoryImp } from 'src/terrariums/infraestructure/ports/mysql/terrariumsProfileRepositoryImp';
import { TerrariumsRepositoryImp } from 'src/terrariums/infraestructure/ports/mysql/terrariumsRepositoryImp';
import { Repository } from 'typeorm';

@Injectable()
export class TerrariumsService {
  constructor(
    @Inject(Terrariums)
    private readonly terrariumsRepository: TerrariumsRepositoryImp,
    @Inject(TerrariumsProfile)
    private readonly terrariumsProfileRepository: terrariumsProfileRepositoryImp,
  ) {}

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      return await this.terrariumsRepository.save(createTerrariumDto);
    } catch (error) {
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  }

  async findAllByUser(user: UpdateTerrariumDto): Promise<TerrariumsInterface[]> {
    try {
      return await this.terrariumsRepository.findAllByOption(user);
    } catch (error) {
      throw CustomError.createCustomError(error.message);
    }
  }

  async findOneById(id: UpdateTerrariumDto): Promise<TerrariumsInterface> {
    try {
      const terrarium = await this.terrariumsRepository.findOneByOption(id);
      if (terrarium) {
        throw new CustomError('NOT_FOUND', 'Terrario no encontrado');
      }
      return terrarium;
    } catch (error) {
      throw CustomError.createCustomError(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {      
      const result =
        (await this.terrariumsRepository.delete(id)) &&
        (await this.terrariumsProfileRepository.delete(id));
      if (!result.raw) {
        throw new CustomError('NOT_FOUND', 'Terrario no encontrado');
      }
    } catch (error) {
      throw CustomError.createCustomError(error.message);
    }
  }
}
