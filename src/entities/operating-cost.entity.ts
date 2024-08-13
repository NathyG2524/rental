import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Project } from './project.entity';
import { OperatingCostDetail } from './operating-cost-detail.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'operating_costs' })
export class OperatingCost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  budgetAmount: number;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  spendingAmount: number;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.operatingCosts)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(
    () => OperatingCostDetail,
    (operatingCostDetails) => operatingCostDetails.operatingCost,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  operatingCostDetails: OperatingCostDetail[];
}
