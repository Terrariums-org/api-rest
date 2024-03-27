import { UserProfileInterface } from 'src/users/domain/entities/user_profile';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_profile' })
export class UserProfile implements UserProfileInterface {
  @PrimaryGeneratedColumn()
    id: number;
  @Column({ nullable: false, length: 60 })
    name: string;
  @Column({ nullable: true, length: 60 })
    last_name: string;
}
