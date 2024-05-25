import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Vendor } from './vendor.entity';
import { AccountPayableDetail } from './account-payable-detail.entity';

@Entity({ name: 'account_payables' })
export class AccountPayable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @Column()
  vendorId: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.accountPayables)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;

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
