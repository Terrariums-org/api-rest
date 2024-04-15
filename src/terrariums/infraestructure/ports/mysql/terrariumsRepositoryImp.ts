import { TerrariumsInterface } from '../../../domain/entities';
import { TerrariumPortRepository } from '../../entities/terrariumPortRepository';
import { Repository } from 'typeorm';
import { Terrariums } from './terrariums.entity';
import { UpdateTerrariumDto } from '../../../domain/dto';
import { CustomError } from '../../../../shared/config/application/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TerrariumsRepositoryImp: Pick<TerrariumPortRepository, any> = {
  async findAllByOption(
    this: Repository<Terrariums>,
    options: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface[]> {
    try {
      const terrariums = await this.find({
        where: options,
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
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  },

  async findOneByOption(
    this: Repository<Terrariums>,
    options: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      const terrariums = await this.findOne({
        where: options,
        relations: {
          user: true,
          terrariumProfile: true,
        },
      });
      if (!terrariums) {
        throw new CustomError('NO_CONTENT', 'No existe este terrario');
      }
      return terrariums;
    } catch (error) {
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  },
};
