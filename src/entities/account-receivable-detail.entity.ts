import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { AccountReceivable } from './account-receivable.entity';
// import { Project } from './project.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'account_receivable_details' })
export class AccountReceivableDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dueDate: Date;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  amount: number;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  paid: number;

  // @Column()
  // projectId: string;

  // @ManyToOne(() => Project, (project) => project.accountReceivableDetails)
  // @JoinColumn({ name: 'projectId' })
  // project: Project;
  @Column()
  accountReceivableId: string;

  @ManyToOne(
    () => AccountReceivable,
    (accountReceivable) => accountReceivable.accountReceivableDetails,
  )
  @JoinColumn({ name: 'accountReceivableId' })
  accountReceivable: AccountReceivable;
}
