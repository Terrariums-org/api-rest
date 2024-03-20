import { Module } from '@nestjs/common';
import { TerrariumsService } from './application/services/terrariums.service';
import { TerrariumsController } from './infraestructure/controllers/terrariums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from './infraestructure/ports/mysql';
import { TokenService } from 'src/auth/aplication/services/token.service';
import { TokenRepositoryImp } from 'src/auth/infraestructure/ports/TokenRepositoryImp.port';

@Module({
  imports: [TypeOrmModule.forFeature([TerrariumsProfile, Terrariums])],
  controllers: [TerrariumsController],
  providers: [TerrariumsService, TokenService, TokenRepositoryImp],
})
export class TerrariumsModule {}
