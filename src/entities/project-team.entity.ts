import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Project } from './project.entity';
import { Department } from './department.entity';
import { ProjectTask } from './project-task.entity';

@Entity({ name: 'project_teams' })
export class ProjectTeam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.projectTeams)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.projectTeams)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => ProjectTask, (projectTasks) => projectTasks.projectTeam, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectTasks: ProjectTask[];
}
