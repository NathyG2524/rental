import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Employee } from './employee.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'social_medias' })
export class SocialMedia extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  followers: number;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  posts: number;

  @Column()
  managerId: string;

  @ManyToOne(() => Employee, (employee) => employee.socialMedias)
  @JoinColumn({ name: 'managerId' })
  manager: Employee;
}
