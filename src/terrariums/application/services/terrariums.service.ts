import { Inject, Injectable } from '@nestjs/common';
import { CustomError } from '../../../shared/config/application/utils';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import { TerrariumsProfileRepositoryImp } from '../../infraestructure/ports/mysql/terrariumsProfileRepositoryImp';
import { InjectRepository } from '@nestjs/typeorm';
import { Terrariums } from '../../infraestructure/ports/mysql';
import { TerrariumPortRepository } from '../../infraestructure/entities/terrariumPortRepository';
import { QueueServiceRepositoryImp } from '../../../shared/connection/broker/application/services/queue.service.';
import { ExchangeName } from '../../../shared/connection/broker/domain/entities/ExchangeName';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: TerrariumPortRepository,
    @Inject(TerrariumsProfileRepositoryImp)
    private readonly terrariumsProfileRepository: TerrariumsProfileRepositoryImp,
    @Inject(QueueServiceRepositoryImp)
    private readonly queueService: QueueServiceRepositoryImp,
  ) {}

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      const terrarium =
        await this.terrariumsRepository.save(createTerrariumDto);
      await this.queueService.sendMessage(terrarium, ExchangeName);
      return terrarium;
    } catch (error) {
      console.log(error);
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  }

  async findAllByUser(id: number): Promise<TerrariumsInterface[]> {
    try {
      const terrariums = await this.terrariumsRepository.findAllByOption({
        user: {
          id,
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

  async findOneById(id: number): Promise<TerrariumsInterface> {
    try {
      const terrarium = await this.terrariumsRepository.findOneByOption({ id });
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
