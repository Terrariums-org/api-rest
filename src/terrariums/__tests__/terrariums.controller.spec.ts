import { Test } from '@nestjs/testing';
import { TerrariumsController } from '../infraestructure/controllers/terrariums.controller';
import { TerrariumsService } from '../application/services/terrariums.service';
import { terrariumsStub } from './stub/terrariums.stub';
import { TokenService } from '../../auth/aplication/services/token.service';
import { TokenRepositoryImp } from '../../auth/infraestructure/ports/TokenRepositoryImp.port';
import { mockTerrariumsService } from './mocks/terrariumService.mock';
import { CreateTerrariumDto } from '../domain/dto';
import { TerrariumsInterface } from '../domain/entities';

describe('Terrariums controller', () => {
  let terrariumsController: TerrariumsController;
  let terrariumToExperiment: CreateTerrariumDto;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TerrariumsController],
      providers: [TerrariumsService, TokenService, TokenRepositoryImp],
    })
      .overrideProvider(TerrariumsService)
      .useValue(mockTerrariumsService)
      .compile();
    terrariumsController =
      moduleRef.get<TerrariumsController>(TerrariumsController);
    terrariumToExperiment = terrariumsStub()[1];
  });

  it('Terrariums controller should be defined', () => {
    expect(terrariumsController).toBeDefined();
  });

  it('Should create a new terrarium', () => {
    expect(terrariumsController.create(terrariumToExperiment)).toEqual(
      terrariumToExperiment,
    );
    expect(mockTerrariumsService.create).toHaveBeenCalledWith(
      terrariumToExperiment,
    );
    expect(mockTerrariumsService.create).toHaveBeenCalledTimes(1);
  });

  it('should return an array of terrariums by user 1', async () => {
    const terrariumList = await terrariumsController.findAllByUser(1);
    expect(terrariumList).toHaveLength(1);
    expect(terrariumList).toMatchObject<TerrariumsInterface[]>(terrariumList);
    expect(mockTerrariumsService.findAllByUser).toHaveBeenCalledTimes(1);
  });

  describe('Find one terrarium', () => {
    it('Should return a terrarium', async () => {
      const terrariumResult = await terrariumsController.findOne(1);
      expect(terrariumResult).not.toBeNull();
      expect(terrariumResult).toMatchObject<TerrariumsInterface>(
        terrariumResult,
      );
      expect(mockTerrariumsService.findOneById).toHaveBeenCalledTimes(1);
    });
    it('Should return null', () => {
      expect(terrariumsController.findOne(-1)).toBeNull();
    });
  });
  it('Should delete a terrarium', () => {
    expect(terrariumsController.remove(1)).toEqual(
      'terrarium with id 1 deleted ',
    );
    expect(mockTerrariumsService.remove).toHaveBeenCalledWith(1);
    expect(mockTerrariumsService.remove).toHaveBeenCalledTimes(1);
  });
});
