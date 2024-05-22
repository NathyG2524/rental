import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';

@Entity({ name: 'employee_time_sheets' })
@Unique(['employeeId', 'date'])
export class EmployeeTimeSheet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'PRESENT' })
  status: string;

  @CreateDateColumn({ type: 'date', default: 'CURRENT_TIMESTAMP ' })
  date: Date;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTimeSheets)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;
}
