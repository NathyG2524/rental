import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { AccountPayableDetail } from './account-payable-detail.entity';
import { Client } from './client.entity';

@Entity({ name: 'account_receivables' })
export class AccountReceivable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.accountReceivables)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(
    () => AccountPayableDetail,
    (accountPayableDetails) => accountPayableDetails.accountPayable,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountPayableDetails: AccountPayableDetail[];
}
