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
import { InvoiceItem } from './invoice-item.entity';
import { InvoiceStatusEnum } from 'src/shared/enums/invoice-status.enum';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: InvoiceStatusEnum,
    default: InvoiceStatusEnum.NOT_PAID,
  })
  status: string;

  @Column()
  invoiceApprovedById: string;

  @ManyToOne(() => Employee, (employee) => employee.invoiceApprovedBys)
  @JoinColumn({ name: 'invoiceApprovedById' })
  invoiceApprovedBy: Employee;

  @Column()
  invoiceCheckedById: string;

  @ManyToOne(() => Employee, (employee) => employee.invoiceCheckedBys)
  @JoinColumn({ name: 'invoiceCheckedById' })
  invoiceCheckedBy: Employee;

  @Column()
  invoiceRequestedById: string;

  @ManyToOne(() => Employee, (employee) => employee.invoiceRequestedBys)
  @JoinColumn({ name: 'invoiceRequestedById' })
  invoiceRequestedBy: Employee;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.invoices)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => InvoiceItem, (invoices) => invoices.invoice, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoiceItems: InvoiceItem[];
}
