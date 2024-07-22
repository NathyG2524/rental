import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Department } from './department.entity';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';

@Entity({ name: 'department_teams' })
export class DepartmentTeam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.departmentTeams)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToOne(() => Project, (projects) => projects.departmentTeam, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projects: Project[];

  @ManyToOne(() => ProjectTask, (projects) => projects.departmentTeam, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  departmentTasks: ProjectTask[];
}
