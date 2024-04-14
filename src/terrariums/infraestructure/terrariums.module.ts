import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import {
  Terrariums,
  TerrariumsProfile,
  TerrariumsRepositoryImp,
} from './ports/mysql';
import { TerrariumsController } from './controllers/terrariums.controller';
import { TerrariumsService } from '../application/services/terrariums.service';
import { TokenService } from '../../auth/aplication/services/token.service';
import { TokenRepositoryImp } from '../../auth/infraestructure/ports/TokenRepositoryImp.port';
import { TerrariumsProfileRepositoryImp } from './ports/mysql/terrariumsProfileRepositoryImp';
import { DataSource } from 'typeorm';
import { QueueRepositoryImp } from '../../shared/connection/broker/infraestructure/ports/MqttLib';
import { QueueServiceRepositoryImp } from '../../shared/connection/broker/application/services/queue.service.';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TerrariumsProfile,
      Terrariums,
      TerrariumsProfileRepositoryImp,
    ]),
  ],
  controllers: [TerrariumsController],
  providers: [
    TerrariumsService,
    TokenService,
    TokenRepositoryImp,
    QueueServiceRepositoryImp,
    QueueRepositoryImp,
    {
      provide: getRepositoryToken(Terrariums),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(Terrariums)
          .extend(TerrariumsRepositoryImp);
      },
    },
  ],
})
export class TerrariumsModule {}
