import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterface } from 'src/users/domain/entities/user';
import { UserProfile } from './user_profile.entity';
import { Terrariums } from 'src/terrariums/infraestructure/ports/mysql';


@Entity({ name: 'users' })
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
    id: number;
  @Column({ nullable: false, length: 60 })
    email: string;
  @Column({ unique: true, nullable: false, length: 45 })
    username: string;
  @Column({ nullable: false })
    passwordUser: string;
  @OneToOne(() => UserProfile)
  @JoinColumn({ name: 'id_user_profile' })
    id_user_profile: UserProfile;
  @OneToMany(() => Terrariums, (terrariums) => terrariums.id_user)
    terrariums: Terrariums[];
}
