import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ default: true })
  isNew: boolean;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.notifications)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;
}
