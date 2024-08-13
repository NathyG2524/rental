import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { OperatingCost } from './operating-cost.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'operating_cost_details' })
export class OperatingCostDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  cost: number;

  @Column()
  operatingCostId: string;

  @ManyToOne(
    () => OperatingCost,
    (operatingCost) => operatingCost.operatingCostDetails,
  )
  @JoinColumn({ name: 'operatingCostId' })
  operatingCost: OperatingCost;
}
