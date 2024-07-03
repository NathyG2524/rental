import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { ProjectTeam } from './project-team.entity';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  permissions: string[];

  @Column()
  responsiblePersonId: string;

  @OneToOne(() => Employee, (employee) => employee.departmentResponsiblePerson)
  @JoinColumn({ name: 'responsiblePersonId' })
  responsiblePerson: Employee;

  @OneToMany(() => Employee, (employees) => employees.department, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  employees: Employee[];

  @OneToMany(() => ProjectTeam, (projectTeams) => projectTeams.department, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectTeams: ProjectTeam[];
}
