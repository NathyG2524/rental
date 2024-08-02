import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Client } from './client.entity';
import { AccountReceivableStatusEnum } from 'src/shared/enums/account-receivable-status.enum';
import { AccountReceivableDetail } from './account-receivable-detail.entity';
import { Invoice } from './invoice.entity';

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
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.accountReceivables)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.accountReceivables)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(
    () => AccountReceivableDetail,
    (accountPayableDetails) => accountPayableDetails.accountReceivable,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountReceivableDetails: AccountReceivableDetail[];
}
