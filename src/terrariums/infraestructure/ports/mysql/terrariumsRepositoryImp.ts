import { Injectable } from '@nestjs/common';
import { TerrariumsInterface } from 'src/terrariums/domain/entities';
import { TerrariumPortRepository } from 'src/terrariums/domain/repositories/terrariumPortRepository';
import { Repository } from 'typeorm';
import { Terrariums } from './terrariums.entity';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';
import { CustomError } from 'src/shared/config/application/utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TerrariumsRepositoryImp
  extends Repository<Terrariums>
  implements TerrariumPortRepository
{
  @InjectRepository(Terrariums) 
  private readonly terrariumsRepository : Repository<Terrariums>;
  
  async findAllByOption(
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
      if (terrariums.length) {
        throw new CustomError('NO_CONTENT', 'No hay terrarios registrados');
      }
      return terrariums;
    } catch (error) {
      throw CustomError.createCustomError('INTERNAL_SERVER_ERROR');
    }
  }

  async findOneByOption(
    id : number,
  ): Promise<TerrariumsInterface> {
    try {
      const terrariums = await this.terrariumsRepository.findOne({
        where: {id},
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
      throw CustomError.createCustomError(error.message);
    }
  }
}
