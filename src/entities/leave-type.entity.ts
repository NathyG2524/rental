import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { EmployeeLeaveAllocation } from './employee-leave-allocation.entity';
import { EmployeeLeaveRequest } from './employee-leave-request.entity';

@Entity({ name: 'leave_types' })
export class LeaveType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  maxAllowedDate: number;

  @Column()
  isPayment: boolean;

  @Column()
  isOptional: boolean;

  @Column()
  includesHolidays: boolean;

  @OneToMany(
    () => EmployeeLeaveAllocation,
    (employeeLeaveAllocations) => employeeLeaveAllocations.leaveType,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  employeeLeaveAllocations: EmployeeLeaveAllocation[];

  @OneToMany(
    () => EmployeeLeaveRequest,
    (employeeLeaveRequests) => employeeLeaveRequests.leaveType,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  employeeLeaveRequests: EmployeeLeaveRequest[];
}
