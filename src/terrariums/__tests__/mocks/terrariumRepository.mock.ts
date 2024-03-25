import { FindManyOptions, FindOneOptions } from 'typeorm';
import { terrariumsStub } from '../stub/terrariums.stub';
import { Terrariums } from '../../infraestructure/ports/mysql';

export const mockTerrariumsRepository = {
  find: jest.fn().mockImplementation((options: FindManyOptions<Terrariums>) => {
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
  delete: jest.fn().mockImplementation((id: number) => {
    let result = { raw: false };
    terrariumsStub().forEach((terrarium) => {
      if (terrarium.id === id) result = { raw: true };
    });
    return result;
  }),
};
