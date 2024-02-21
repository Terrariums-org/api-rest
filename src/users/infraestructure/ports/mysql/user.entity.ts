import { UserInterface } from 'src/users/domain/entities/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, length: 60 })
  name: string;
  @Column({ nullable: true, length: 60 })
  last_name: string;
  @Column({ nullable: false, length: 60 })
  email: string;
  @Column({ unique: true, nullable: false, length: 45 })
  username: string;
  @Column({ nullable: false })
  password: string;
}
