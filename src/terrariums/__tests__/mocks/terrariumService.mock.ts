import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { terrariumsStub } from '../stub/terrariums.stub';
import { TerrariumsInterface } from '../../domain/entities';

export const mockTerrariumsService = {
  create: jest
    .fn()
    .mockImplementation(
      (terrariumReq: CreateTerrariumDto): CreateTerrariumDto => {
        return terrariumReq;
      },
    ),
  findAll: jest.fn().mockImplementation(() => {
    return terrariumsStub();
  }),
  findOne: jest
    .fn()
    .mockImplementation((idTerrarium: number): TerrariumsInterface => {
      return (
        terrariumsStub().filter(
          (terrarium) => terrarium.id === idTerrarium,
        )[0] ?? null
      );
    }),
  remove: jest.fn().mockImplementation((idTerrarium: number) => {
    return `terrarium with id ${idTerrarium} deleted `;
  }),
};
