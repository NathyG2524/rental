import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { Invoice } from './invoice.entity';
import { AccountReceivable } from './account-receivable.entity';

@Entity({ name: 'clients' })
@Unique(['name', 'email'])
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  contactPersonName: string;

  @Column({ nullable: true })
  contactPersonPhone: string;

  @Column({ type: 'simple-array', nullable: true })
  secondaryEmail: string[];

  @Column({ type: 'simple-array', nullable: true })
  secondaryPhone: string[];

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
