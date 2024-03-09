import { UserProfileInterface } from 'src/users/domain/entities/user_profile';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_profile' })
export class UserProfile implements UserProfileInterface {
  
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column({ nullable: false, length: 60 })
  readonly name: string;
  @Column({ nullable: true, length: 60 })
  last_name: string;
  @OneToOne(() => User, (user) => user.userProfile)
  user: User;
}
