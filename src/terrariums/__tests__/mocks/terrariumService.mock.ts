import { CreateTerrariumDto } from '../../domain/dto';
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
  findAllByUser: jest.fn().mockImplementation((idUser: number) => {
    return terrariumsStub().filter((terrarium) => terrarium.user.id === idUser);
  }),
  findOneById: jest
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
