import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Expense } from './expense.entity';
import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';

@Entity({ name: 'expense_details' })
export class ExpenseDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
  cost: number;

  @Column()
  expenseId: string;

  @ManyToOne(() => Expense, (expense) => expense.expenseDetails)
  @JoinColumn({ name: 'expenseId' })
  expense: Expense;
}
