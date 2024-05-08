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

@Entity({ name: 'employee_leave_requests' })
export class EmployeeLeaveRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTimeSheets)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  effectiveFrom: Date;

  @Column()
  effectiveTo: Date;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'jsonb', nullable: true })
  document: string;

  @Column()
  leaveTypeId: string;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.employeeLeaveRequests)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;
}
