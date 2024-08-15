import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Department } from './department.entity';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';
import { DepartmentTeamMember } from './department-team-member.entity';
import { Employee } from './employee.entity';

@Entity({ name: 'department_teams' })
export class DepartmentTeam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  teamLeadId: string;

  @ManyToOne(() => Employee, (department) => department.teamLeads)
  @JoinColumn({ name: 'teamLeadId' })
  teamLead: Employee;

  @Column()
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.departmentTeams)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @OneToMany(() => Project, (projects) => projects.departmentTeam, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projects: Project[];

  @OneToMany(() => ProjectTask, (projects) => projects.departmentTeam, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  departmentTasks: ProjectTask[];

  @OneToMany(
    () => DepartmentTeamMember,
    (projects) => projects.departmentTeam,
    {
      cascade: true,
      onDelete: 'RESTRICT',
    },
  )
  departmentTeamMembers: DepartmentTeamMember[];
}
