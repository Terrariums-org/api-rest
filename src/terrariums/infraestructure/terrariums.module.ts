import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { TokenService } from 'src/auth/aplication/services/token.service';
import { TokenRepositoryImp } from 'src/auth/infraestructure/ports/TokenRepositoryImp.port';
import { Terrariums, TerrariumsProfile, TerrariumsRepositoryImp } from './ports/mysql';
import { TerrariumsController } from './controllers/terrariums.controller';
import { TerrariumsService } from '../application/services/terrariums.service';
import { TerrariumsProfileRepositoryImp } from './ports/mysql/terrariumsProfileRepositoryImp';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TerrariumsProfile, Terrariums, TerrariumsProfileRepositoryImp])],
  controllers: [TerrariumsController],
  providers: [
    TerrariumsService,
    TokenService,
    TokenRepositoryImp,
    {
      provide: getRepositoryToken(Terrariums),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Terrariums).extend(TerrariumsRepositoryImp);
      },
    },
  ],
})
export class TerrariumsModule {}
