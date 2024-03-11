import { TerrariumsInterface } from 'src/terrariums/domain/entities';
import { User } from 'src/users/infraestructure/ports/mysql/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TerrariumsProfile } from './terrariums_profile.entity';

@Entity({ name: 'terrariums' })
export class Terrariums implements TerrariumsInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 60 })
  name: string;
  @ManyToOne(() => User, (user) => user.terrariums)
  id_user: User;
  @OneToOne(() => TerrariumsProfile, { cascade: true })
  @JoinColumn({ name: 'id_terrarium_profile' })
  id_terrarium_profile: TerrariumsProfile;
}
