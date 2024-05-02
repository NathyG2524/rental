import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Client } from './client.entity';

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
}
