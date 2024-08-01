import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { AccountReceivable } from './account-receivable.entity';
import { Project } from './project.entity';

@Entity({ name: 'account_receivable_details' })
export class AccountReceivableDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  unit: number;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'numeric', nullable: true })
  paid: number;

  @Column({ type: 'numeric', nullable: true })
  days: number;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.accountReceivableDetails)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  accountReceivableId: string;

  @ManyToOne(
    () => AccountReceivable,
    (accountReceivable) => accountReceivable.accountReceivableDetails,
  )
  @JoinColumn({ name: 'accountReceivableId' })
  accountReceivable: AccountReceivable;
}
