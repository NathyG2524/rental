import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Project } from './project.entity';

@Entity({ name: 'quotation_items' })
export class QuotationItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  unitPrice: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (quotation) => quotation.projectItems)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
