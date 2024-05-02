import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';

@Entity({ name: 'employee_time_sheets' })
export class EmployeeTimeSheet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTimeSheets)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;
}
