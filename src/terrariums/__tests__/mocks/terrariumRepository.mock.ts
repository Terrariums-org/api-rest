import { FindOneOptions } from 'typeorm';
import { terrariumsStub } from '../stub/terrariums.stub';
import { Terrariums } from '../../infraestructure/ports/mysql';
import { CreateTerrariumDto } from '../../domain/dto';

export const mockTerrariumsRepository = {
  find: jest.fn().mockImplementation(() => {
    return terrariumsStub();
  }),
  findOne: jest
    .fn()
    .mockImplementation((options: FindOneOptions<Terrariums>) => {
      const { id } = options.where as { id: number };
      return (
        terrariumsStub().filter((terrarium) => terrarium.id === id)[0] ?? null
      );
    }),
  findAllByOption: jest.fn().mockImplementation((options) => {
    const { id } = options.user as {
      id: number;
    };

    return terrariumsStub().filter((terrarium) => terrarium.user.id === id);
  }),
  findOneByOption: jest.fn().mockImplementation((options) => {
    const { id } = options;
    return (
      terrariumsStub().filter((terrarium) => terrarium.id === id)[0] ?? null
    );
  }),
  delete: jest.fn().mockImplementation((id: number) => {
    let result = { raw: false };
    terrariumsStub().forEach((terrarium) => {
      if (terrarium.id === id) {
        result = { raw: true };
      }
    });
    return result;
  }),
  save: jest
    .fn()
    .mockImplementation((terrariumReq: CreateTerrariumDto) => terrariumReq),
};
