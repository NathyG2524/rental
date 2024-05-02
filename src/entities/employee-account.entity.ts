import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';

@Entity({ name: 'employee_accounts' })
export class EmployeeAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  permissions: string[];

  @Column()
  employeeId: string;

  @OneToOne(() => Employee, (employee) => employee.employeeAccount)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;
}
