import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { EmployeeTimeSheet } from './employee-time-sheet.entity';
import { Client } from './client.entity';
import { Department } from './department.entity';
import { EmployeeAccount } from './employee-account.entity';
import { SocialMedia } from './social-media.entity';
import { Vendor } from './vendor.entity';
import { ProjectTask } from './project-task.entity';
import { Invoice } from './invoice.entity';
import { Quotation } from './quotation.entity';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idNo: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  startDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  details: any;

  @Column({ nullable: true })
  tin: string;

  @Column({ type: 'jsonb', nullable: true })
  contractLetter: any;

  @Column({ type: 'jsonb', nullable: true })
  employeeIdPhoto: any;

  @Column({ type: 'jsonb', nullable: true })
  kebeleIdPhoto: any;

  @Column({ default: 'Active' })
  status: string;

  @Column({ nullable: true })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @OneToOne(
    () => EmployeeAccount,
    (employeeAccount) => employeeAccount.employee,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  employeeAccount: EmployeeAccount;

  @OneToMany(
    () => EmployeeTimeSheet,
    (employeeTimeSheets) => employeeTimeSheets.employee,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  employeeTimeSheets: EmployeeTimeSheet[];

  @OneToMany(() => Client, (clients) => clients.createdBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  clients: Client[];

  @OneToMany(() => Vendor, (vendors) => vendors.createdBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  vendors: Vendor[];

  @OneToMany(() => SocialMedia, (socialMedias) => socialMedias.manager, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  socialMedias: SocialMedia[];

  @OneToMany(
    () => ProjectTask,
    (assignedEmployees) => assignedEmployees.assignedEmployee,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  assignedEmployees: ProjectTask[];

  @OneToMany(
    () => ProjectTask,
    (assignedReviewers) => assignedReviewers.assignedReviewer,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  assignedReviewers: ProjectTask[];

  @OneToOne(
    () => Department,
    (departmentResponsiblePerson) =>
      departmentResponsiblePerson.responsiblePerson,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  departmentResponsiblePerson: Department;

  @OneToMany(() => Invoice, (approvedBys) => approvedBys.invoiceApprovedBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoiceApprovedBys: Invoice[];

  @OneToMany(() => Invoice, (checkedBys) => checkedBys.invoiceCheckedBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoiceCheckedBys: Invoice[];

  @OneToMany(() => Invoice, (requestedBys) => requestedBys.invoiceRequestedBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  invoiceRequestedBys: Invoice[];

  @OneToMany(
    () => Quotation,
    (approvedBys) => approvedBys.quotationApprovedBy,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  quotationApprovedBys: Quotation[];

  @OneToMany(() => Quotation, (checkedBys) => checkedBys.quotationCheckedBy, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  quotationCheckedBys: Quotation[];

  @OneToMany(
    () => Quotation,
    (requestedBys) => requestedBys.quotationRequestedBy,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  quotationRequestedBys: Quotation[];
}
