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

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idNo: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  startDate: Date;

  @Column()
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'employeeId' })
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

  @OneToMany(() => SocialMedia, (socialMedias) => socialMedias.manager, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  socialMedias: SocialMedia[];

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
}
