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
import { Invoice } from './invoice.entity';
import { AccountPayableStatusEnum } from 'src/shared/enums/account-receivable-status.enum';

@Entity({ name: 'account_payables' })
export class AccountPayable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dueDate: Date;

  @Column()
  reference: string;

  @Column({
    type: 'enum',
    enum: AccountPayableStatusEnum,
    default: AccountPayableStatusEnum.NOT_PAID,
  })
  status: string;

  @Column()
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.accountPayables)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

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
