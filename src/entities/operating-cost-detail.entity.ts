import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { OperatingCost } from './operating-cost.entity';

@Entity({ name: 'operating_cost_details' })
export class OperatingCostDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
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
