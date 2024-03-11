import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';
import { Terrariums, TerrariumsProfile } from 'src/terrariums/infraestructure/ports/mysql';
import { Repository } from 'typeorm';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums) private readonly terrariumsRepository: Repository<Terrariums>,
    @InjectRepository(TerrariumsProfile) private readonly terrariumsProfileRepository: Repository<TerrariumsProfile>,
  ) {}

  create(createTerrariumDto: UpdateTerrariumDto) {
    console.log(createTerrariumDto);
    return this.terrariumsRepository.save(createTerrariumDto);
  }

  findAll() {
    return `This action returns all terrariums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} terrarium`;
  }

  update(id: number, updateTerrariumDto: UpdateTerrariumDto) {
    return `This action updates a #${id} terrarium`;
  }

  remove(id: number) {
    return `This action removes a #${id} terrarium`;
  }
}
