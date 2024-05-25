import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { ProjectTeam } from './project-team.entity';
import { Employee } from './employee.entity';
import { Project } from './project.entity';

@Entity({ name: 'project_tasks' })
export class ProjectTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column()
  assignedEmployeeId: string;

  @ManyToOne(
    () => Employee,
    (assignedEmployee) => assignedEmployee.assignedEmployees,
  )
  @JoinColumn({ name: 'assignedEmployeeId' })
  assignedEmployee: Employee;

  @Column()
  assignedReviewerId: string;

  @ManyToOne(
    () => Employee,
    (assignedReviewer) => assignedReviewer.assignedReviewers,
  )
  @JoinColumn({ name: 'assignedReviewerId' })
  assignedReviewer: Employee;

  @Column()
  projectTeamId: string;

  @ManyToOne(() => ProjectTeam, (projectTeam) => projectTeam.projectTasks)
  @JoinColumn({ name: 'projectTeamId' })
  projectTeam: ProjectTeam;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.projectTasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
