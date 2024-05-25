import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Client } from './client.entity';
import { ProjectTeam } from './project-team.entity';
import { VendorTask } from './vendor-task.entity';
import { ProjectTask } from './project-task.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  type: string;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, (client) => client.projects)
  @JoinColumn({ name: 'createdById' })
  client: Client;

  @OneToMany(() => ProjectTeam, (projectTeams) => projectTeams.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectTeams: ProjectTeam[];

  @OneToMany(() => ProjectTask, (projectTasks) => projectTasks.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  projectTasks: ProjectTask[];

  @OneToMany(() => VendorTask, (vendorTasks) => vendorTasks.project, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  vendorTasks: VendorTask[];
}
