import { TerrariumsProfileInterface } from 'src/terrariums/domain/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'terrariums_profile' })
export class TerrariumsProfile implements TerrariumsProfileInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float' })
  max_temp: string;
  @Column({ type: 'float' })
  min_temp: string;
  @Column({ type: 'float' })
  max_humidity: string;
  @Column({ type: 'float' })
  min_humidity: string;
  @Column({ type: 'float' })
  max_uv: string;
  @Column({ type: 'float' })
  min_uv: string;
}
