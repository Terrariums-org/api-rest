import { Injectable } from '@nestjs/common';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';

@Injectable()
export class TerrariumsService {
  create(createTerrariumDto: CreateTerrariumDto) {
    return 'This action adds a new terrarium';
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
