import { Test } from '@nestjs/testing';
import { TerrariumsService } from '../application/services/terrariums.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from '../infraestructure/ports/mysql';
import { mockTerrariumsRepository } from './mocks/terrariumRepository.mock';
import { TerrariumsInterface } from '../domain/entities';
import { QueueServiceRepositoryImp } from '../../shared/connection/broker/application/services/queue.service.';
import { QueueRepositoryImp } from '../../shared/connection/broker/infraestructure/ports/MqttLib';
import { TerrariumsProfileRepositoryImp } from '../infraestructure/ports/mysql/terrariumsProfileRepositoryImp';

describe('Terrariums service', () => {
  let terrariumsService: TerrariumsService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TerrariumsService,
        QueueServiceRepositoryImp,
        QueueRepositoryImp,
        {
          provide: getRepositoryToken(Terrariums),
          useValue: mockTerrariumsRepository,
        },
        {
          provide: getRepositoryToken(TerrariumsProfile),
          useValue: mockTerrariumsRepository,
        },
        {
          provide: getRepositoryToken(TerrariumsProfileRepositoryImp),
          useValue: mockTerrariumsRepository,
        },
      ],
    }).compile();
    terrariumsService = moduleRef.get<TerrariumsService>(TerrariumsService);
  });

  it('Terrariums service should be defined', () => {
    expect(terrariumsService).toBeDefined();
  });

  it('Should return all terrariums by user 1', async () => {
    const terrariumList = await terrariumsService.findAllByUser(1);
    expect(terrariumList).toHaveLength(1);
    expect(terrariumList).toMatchObject<TerrariumsInterface[]>(terrariumList);
    expect(mockTerrariumsRepository.findAllByOption).toHaveBeenCalledTimes(1);
  });

  describe('Find one terrarium', () => {
    it('Should return a terrarium', async () => {
      const terrariumResult = await terrariumsService.findOneById(1);
      expect(terrariumResult).not.toBeNull();
      expect(terrariumResult).toMatchObject<TerrariumsInterface>(
        terrariumResult,
      );
      expect(mockTerrariumsRepository.findOneByOption).toHaveBeenCalledTimes(1);
    });
    it('Should return a \'NOT_FOUND\' error', async () => {
      await expect(terrariumsService.findOneById(0)).rejects.toThrow(
        'NOT_FOUND',
      );
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
