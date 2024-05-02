import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';

@Entity({ name: 'social_medias' })
export class SocialMedia extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  managerId: string;

  @ManyToOne(() => Employee, (employee) => employee.socialMedias)
  @JoinColumn({ name: 'managerId' })
  manager: Employee;
}
