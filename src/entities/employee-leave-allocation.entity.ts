import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { LeaveType } from './leave-type.entity';

@Entity({ name: 'employee_leave_allocations' })
export class EmployeeLeaveAllocation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTimeSheets)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  allowedDate: number;

  @Column()
  leaveTypeId: string;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.employeeLeaveAllocations)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;
}
