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
import { Project } from './project.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'account_payable_details' })
export class AccountPayableDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  unit: number;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  amount: number;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  paid: number;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  days: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.accountPayableDetails)
  @JoinColumn({ name: 'projectId' })
  project: Project;

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
