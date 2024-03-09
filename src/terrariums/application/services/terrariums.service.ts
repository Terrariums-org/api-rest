import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';
import { TerrariumsInterface } from 'src/terrariums/domain/entities';
import { TerrariumsServiceRepository } from 'src/terrariums/domain/repositories/terrariumsServiceRepository';
import { Terrariums } from 'src/terrariums/infraestructure/ports/mysql';
import { Repository } from 'typeorm';

@Injectable()
export class TerrariumsService implements TerrariumsServiceRepository {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: Repository<Terrariums>,
  ) {}

  async getAllService(): Promise<TerrariumsInterface[]> {
    try {
      return await this.terrariumsRepository.find();
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeService(id: number): Promise<void> {
    try {
      const result = await this.terrariumsRepository.delete(id);
      if (result.raw)
        throw new HttpException(
          'Terrarium was not affected',
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateService(
    terrarium: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      return await this.terrariumsRepository.save(terrarium);
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
