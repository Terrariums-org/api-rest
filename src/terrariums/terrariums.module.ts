import { Module } from '@nestjs/common';
import { TerrariumsService } from './application/services/terrariums.service';
import { TerrariumsController } from './infraestructure/controllers/terrariums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terrariums, TerrariumsProfile } from './infraestructure/ports/mysql';

@Module({
  imports: [TypeOrmModule.forFeature([TerrariumsProfile, Terrariums])],
  controllers: [TerrariumsController],
  providers: [TerrariumsService],
})
export class TerrariumsModule {}
