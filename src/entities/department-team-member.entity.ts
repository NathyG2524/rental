import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { DepartmentTeam } from './department-team.entity';
import { Employee } from './employee.entity';

@Entity({ name: 'department_team_members' })
export class DepartmentTeamMember extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @ManyToOne(
    () => Employee,
    (departmentTeam) => departmentTeam.departmentTeamMembers,
  )
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  departmentTeamId: string;

  @ManyToOne(
    () => DepartmentTeam,
    (departmentTeam) => departmentTeam.departmentTeamMembers,
  )
  @JoinColumn({ name: 'departmentTeamId' })
  departmentTeam: DepartmentTeam;
}
