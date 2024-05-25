import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Invoice } from './invoice.entity';

@Entity({ name: 'invoice_items' })
export class InvoiceItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  unitPrice: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column()
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;
}
