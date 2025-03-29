import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idNo: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  personalEmail: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  startDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  details: any;

  @Column({ type: 'jsonb', nullable: true })
  employeeIdPhoto: any;

  @Column({ type: 'jsonb', nullable: true })
  kebeleIdPhoto: any;

  @Column({ default: 'Active' })
  status: string;

  @Column({ nullable: true })
  bankAccount: string;

  @Column({ nullable: true })
  jobTitle: string;

  @ManyToOne(() => Account, (account) => account.user)
  account: Account;
}
