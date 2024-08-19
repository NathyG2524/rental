import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { VendorTask } from './vendor-task.entity';
import { AccountPayableDetail } from './account-payable-detail.entity';

@Entity({ name: 'vendors' })
@Unique(['name', 'email'])
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tin: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: any;

  @Column()
  createdById: string;

  @ManyToOne(() => Employee, (employee) => employee.clients)
  @JoinColumn({ name: 'createdById' })
  createdBy: Employee;

  @OneToMany(() => VendorTask, (vendorTasks) => vendorTasks.vendor, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  vendorTasks: VendorTask[];

  @OneToMany(
    () => AccountPayableDetail,
    (accountPayableDetails) => accountPayableDetails.vendor,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountPayableDetails: AccountPayableDetail[];
}
