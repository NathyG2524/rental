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
import { DepartmentTeam } from './department-team.entity';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  permissions: string[];

  @Column({ nullable: true })
  responsiblePersonId: string;

  @OneToOne(() => Employee, (employee) => employee.departmentResponsiblePerson)
  @JoinColumn({ name: 'responsiblePersonId' })
  responsiblePerson: Employee;

  @OneToMany(() => Employee, (employees) => employees.department, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  employees: Employee[];

  @OneToMany(
    () => DepartmentTeam,
    (DepartmentTeams) => DepartmentTeams.department,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  departmentTeams: DepartmentTeam[];
}
