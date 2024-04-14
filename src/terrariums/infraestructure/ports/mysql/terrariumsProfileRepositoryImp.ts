import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TerrariumsProfile } from './terrariums_profile.entity';

@Injectable()
export class TerrariumsProfileRepositoryImp extends Repository<TerrariumsProfile> {}
