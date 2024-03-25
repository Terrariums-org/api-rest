import { Test } from '@nestjs/testing';
import { TerrariumsService } from '../application/services/terrariums.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from '../infraestructure/ports/mysql';
import { mockTerrariumsRepository } from './mocks/terrariumRepository.mock';
import { TerrariumsInterface } from '../domain/entities';

describe('Terrariums service', () => {
  let terrariumsService: TerrariumsService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TerrariumsService,
        {
          provide: getRepositoryToken(Terrariums),
          useValue: mockTerrariumsRepository,
        },
        {
          provide: getRepositoryToken(TerrariumsProfile),
          useValue: mockTerrariumsRepository,
        },
      ],
    }).compile();
    terrariumsService = moduleRef.get<TerrariumsService>(TerrariumsService);
  });

  it('Terrariums service should be defined', () => {
    expect(terrariumsService).toBeDefined();
  });

  it('Should return all terrariums', async () => {
    const terrariumList = await terrariumsService.findAll();
    expect(terrariumList).toHaveLength(4);
    expect(terrariumList).toMatchObject<TerrariumsInterface[]>(terrariumList);
    expect(mockTerrariumsRepository.find).toHaveBeenCalledTimes(1);
  });

  describe('Find one terrarium', () => {
    it('Should return a terrarium', async () => {
      const terrariumResult = await terrariumsService.findOne(1);
      expect(terrariumResult).not.toBeNull();
      expect(terrariumResult).toMatchObject<TerrariumsInterface>(
        terrariumResult,
      );
      expect(mockTerrariumsRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it("Should return a 'NOT_FOUND' error", async () => {
      await expect(terrariumsService.findOne(0)).rejects.toThrow('NOT_FOUND');
    });
  });

  describe('Remove a terrarium', () => {
    it('Should remove a terrarium', async () => {
      await terrariumsService.remove(1);
      expect(mockTerrariumsRepository.delete).toHaveBeenCalledTimes(2);
    });
    it('Should not remove a terrarium and should return a "NOT_FOUND" error', async () => {
      await expect(terrariumsService.remove(0)).rejects.toThrow('NOT_FOUND');
    });
  });
});
