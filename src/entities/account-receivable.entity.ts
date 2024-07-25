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
import { AccountReceivableStatusEnum } from 'src/shared/enums/account-receivable-status.enum';

@Entity({ name: 'account_receivables' })
export class AccountReceivable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reference: string;

  @Column()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: AccountReceivableStatusEnum,
    default: AccountReceivableStatusEnum.NOT_RECEIVED,
  })
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
