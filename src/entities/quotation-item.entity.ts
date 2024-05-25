import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Quotation } from './quotation.entity';

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
  quotationId: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.quotationItems)
  @JoinColumn({ name: 'quotationId' })
  quotation: Quotation;
}
