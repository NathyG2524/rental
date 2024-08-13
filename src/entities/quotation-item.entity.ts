import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Project } from './project.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'quotation_items' })
export class QuotationItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  unitPrice: number;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  quantity: number;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  days: number;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (quotation) => quotation.projectItems)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
