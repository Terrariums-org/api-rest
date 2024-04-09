import { Module } from '@nestjs/common';
import { TerrariumsService } from '../application/services/terrariums.service';
import { TerrariumsController } from './controllers/terrariums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from './ports/mysql';
import { TokenService } from '../../auth/aplication/services/token.service';
import { TokenRepositoryImp } from '../../auth/infraestructure/ports/TokenRepositoryImp.port';

@Module({
  imports: [TypeOrmModule.forFeature([TerrariumsProfile, Terrariums])],
  controllers: [TerrariumsController],
  providers: [TerrariumsService, TokenService, TokenRepositoryImp],
})
export class TerrariumsModule {}
