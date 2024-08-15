import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Client } from './client.entity';
import { DepartmentTeam } from './department-team.entity';
import { VendorTask } from './vendor-task.entity';
import { ProjectTask } from './project-task.entity';
import { QuotationItem } from './quotation-item.entity';
import { Quotation } from './quotation.entity';
import { InvoiceItem } from './invoice-item.entity';
import { AccountPayableDetail } from './account-payable-detail.entity';
import { AccountReceivableDetail } from './account-receivable-detail.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  type: string;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.projects)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column()
  quotationId: string;

  @ManyToOne(() => Quotation, (client) => client.projects)
  @JoinColumn({ name: 'quotationId' })
  quotation: Quotation;

  @OneToMany(() => QuotationItem, (projectTeams) => projectTeams.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectItems: QuotationItem[];

  @Column({ nullable: true })
  departmentTeamId: string;

  @ManyToOne(() => DepartmentTeam, (client) => client.projects)
  @JoinColumn({ name: 'departmentTeamId' })
  departmentTeam: DepartmentTeam;

  @OneToMany(() => ProjectTask, (projectTasks) => projectTasks.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectTasks: ProjectTask[];

  @OneToMany(() => VendorTask, (vendorTasks) => vendorTasks.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  vendorTasks: VendorTask[];

  @OneToMany(() => InvoiceItem, (operatingCosts) => operatingCosts.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoiceItems: InvoiceItem[];

  @OneToMany(
    () => AccountPayableDetail,
    (operatingCosts) => operatingCosts.project,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountPayableDetails: AccountPayableDetail[];

  @OneToMany(
    () => AccountReceivableDetail,
    (operatingCosts) => operatingCosts.project,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  accountReceivableDetails: AccountReceivableDetail[];
}
