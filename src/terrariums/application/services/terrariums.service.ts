import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomError } from '../../../shared/config/application/utils';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import {
  Terrariums,
  TerrariumsProfile,
} from '../../infraestructure/ports/mysql';
import { Repository } from 'typeorm';
import { QueueServiceRepositoryImp } from '../../../shared/connection/broker/application/services/queue.service.';
import { ExchangeName } from '../../../shared/connection/broker/domain/entities/ExchangeName';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: Repository<Terrariums>,
    @InjectRepository(TerrariumsProfile)
    private readonly terrariumsProfileRepository: Repository<TerrariumsProfile>,
    @Inject(QueueServiceRepositoryImp)
    private readonly queueServiceRepository: QueueServiceRepositoryImp,
  ) {}

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      const terrarium =
        await this.terrariumsRepository.save(createTerrariumDto);
      await this.queueServiceRepository.sendMessage(
        terrarium,
        ExchangeName,
        'info',
      );
      return terrarium;
    } catch (error) {
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  }

  async findAll(): Promise<TerrariumsInterface[]> {
    try {
      const terrariums = await this.terrariumsRepository.find({
        relations: {
          user: true,
          terrariumProfile: true,
        },
      });
      if (!terrariums.length) {
        throw new CustomError('NO_CONTENT', 'No hay terrarios registrados');
      }
      return terrariums;
    } catch (error) {
      throw CustomError.createCustomError(error.message);
    }
  }

  async findOne(id: number): Promise<TerrariumsInterface> {
    try {
      const terrarium = await this.terrariumsRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
          terrariumProfile: true,
        },
      });
      if (!terrarium) {
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
