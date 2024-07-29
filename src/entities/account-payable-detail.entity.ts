import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { AccountPayable } from './account-payable.entity';
import { Vendor } from './vendor.entity';

@Entity({ name: 'account_payable_details' })
export class AccountPayableDetail extends BaseEntity {
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
  type: string;

  @Column()
  status: string;

  @Column()
  vendorId: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.accountPayableDetails)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;

  @Column()
  accountPayableId: string;

  @ManyToOne(
    () => AccountPayable,
    (accountPayable) => accountPayable.accountPayableDetails,
  )
  @JoinColumn({ name: 'accountPayableId' })
  accountPayable: AccountPayable;
}
