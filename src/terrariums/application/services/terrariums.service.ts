import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';
import { TerrariumsInterface } from 'src/terrariums/domain/entities';
import {
  Terrariums,
  TerrariumsProfile,
} from 'src/terrariums/infraestructure/ports/mysql';
import { Repository } from 'typeorm';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: Repository<Terrariums>,
    @InjectRepository(TerrariumsProfile)
    private readonly terrariumsProfileRepository: Repository<TerrariumsProfile>,
  ) {}

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      return await this.terrariumsRepository.save(createTerrariumDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<TerrariumsInterface[]> {
    try {
      return await this.terrariumsRepository.find({
        relations: {
          user: true,
          terrariumProfile: true,
        },
        where: {},
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return this.terrariumsRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
          terrariumProfile: true,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result =
      (await this.terrariumsRepository.delete(id)) &&
      (await this.terrariumsProfileRepository.delete(id));
    if (!result.raw)
      throw new HttpException('No affected user', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}