import { Inject, Injectable } from '@nestjs/common';
import { CustomError } from '../../../shared/config/application/utils';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import { TerrariumsProfileRepositoryImp } from 'src/terrariums/infraestructure/ports/mysql/terrariumsProfileRepositoryImp';
import { InjectRepository } from '@nestjs/typeorm';
import { Terrariums } from 'src/terrariums/infraestructure/ports/mysql';
import { TerrariumPortRepository } from 'src/terrariums/infraestructure/entities/terrariumPortRepository';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: TerrariumPortRepository,
    @Inject(TerrariumsProfileRepositoryImp)
    private readonly terrariumsProfileRepository: TerrariumsProfileRepositoryImp,
  ) {}

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      return await this.terrariumsRepository.save(createTerrariumDto);
    } catch (error) {
      console.log(error);
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  }

  async findAllByUser(
    user: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface[]> {
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
