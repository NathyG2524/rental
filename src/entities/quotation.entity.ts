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
import { Client } from './client.entity';
import { QuotationItem } from './quotation-item.entity';

@Entity({ name: 'quotations' })
export class Quotation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column()
  quotationApprovedById: string;

  @ManyToOne(() => Employee, (employee) => employee.quotationApprovedBys)
  @JoinColumn({ name: 'quotationApprovedById' })
  quotationApprovedBy: Employee;

  @Column()
  quotationCheckedById: string;

  @ManyToOne(() => Employee, (employee) => employee.quotationCheckedBys)
  @JoinColumn({ name: 'quotationCheckedBy' })
  quotationCheckedBy: Employee;

  @Column()
  quotationRequestedById: string;

  @ManyToOne(() => Employee, (employee) => employee.quotationRequestedBys)
  @JoinColumn({ name: 'quotationRequestedById' })
  quotationRequestedBy: Employee;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.invoices)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => QuotationItem, (quotationItem) => quotationItem.quotation, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  quotationItems: QuotationItem[];
}
