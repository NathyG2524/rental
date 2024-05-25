import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { VendorTask } from './vendor-task.entity';

@Entity({ name: 'vendors' })
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
}
