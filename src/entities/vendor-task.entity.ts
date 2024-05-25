import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Project } from './project.entity';
import { Vendor } from './vendor.entity';

@Entity({ name: 'vendor_tasks' })
export class VendorTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  budget: number;

  @Column()
  status: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.vendorTasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  vendorId: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.vendorTasks)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;
}
