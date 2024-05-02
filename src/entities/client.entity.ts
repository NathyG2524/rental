import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { Project } from './project.entity';

@Entity({ name: 'clients' })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdById: string;

  @ManyToOne(() => Employee, (employee) => employee.clients)
  @JoinColumn({ name: 'createdById' })
  createdBy: Employee;

  @OneToMany(() => Project, (projects) => projects.client, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projects: Project[];
}
