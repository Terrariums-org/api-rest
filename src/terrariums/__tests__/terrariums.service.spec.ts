import { Test } from '@nestjs/testing';
import { TerrariumsService } from '../application/services/terrariums.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from '../infraestructure/ports/mysql';

describe('Terrariums service', () => {
  let terrariumsService: TerrariumsService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TerrariumsService,
        {
          provide: getRepositoryToken(Terrariums),
          useValue: {},
        },
        {
          provide: getRepositoryToken(TerrariumsProfile),
          useValue: {},
        },
      ],
    }).compile();
    terrariumsService = moduleRef.get<TerrariumsService>(TerrariumsService);
  });
});
