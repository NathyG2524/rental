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
import { Project } from './project.entity';
import { Invoice } from './invoice.entity';
import { AccountReceivable } from './account-receivable.entity';

@Entity({ name: 'clients' })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: any;

  @Column()
  createdById: string;

  @ManyToOne(() => Employee, (employee) => employee.clients)
  @JoinColumn({ name: 'createdById' })
  createdBy: Employee;

  @OneToMany(() => Project, (projects) => projects.client, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projects: Project[];

  @OneToMany(() => Invoice, (invoices) => invoices.client, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoices: Invoice[];

  @OneToMany(
    () => AccountReceivable,
    (accountReceivables) => accountReceivables.client,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountReceivables: AccountReceivable[];
}
