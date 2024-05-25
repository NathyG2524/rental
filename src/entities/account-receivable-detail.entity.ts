import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { AccountReceivable } from './account-receivable.entity';

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

  @Column({ type: 'numeric' })
  paid: number;

  @Column()
  accountReceivableId: string;

  @ManyToOne(
    () => AccountReceivable,
    (accountReceivable) => accountReceivable.accountPayableDetails,
  )
  @JoinColumn({ name: 'accountReceivableId' })
  accountReceivable: AccountReceivable;
}
