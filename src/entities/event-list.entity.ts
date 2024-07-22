import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'event_lists' })
export class EventList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;
}
