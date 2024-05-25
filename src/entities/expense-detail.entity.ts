import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Expense } from './expense.entity';

@Entity({ name: 'expense_details' })
export class ExpenseDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  cost: number;

  @Column()
  expenseId: string;

  @ManyToOne(() => Expense, (expense) => expense.expenseDetails)
  @JoinColumn({ name: 'expenseId' })
  expense: Expense;
}
