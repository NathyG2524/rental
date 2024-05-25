import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ExpenseDetail } from './expense-detail.entity';

@Entity({ name: 'expenses' })
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  budgetAmount: number;

  @Column({ type: 'numeric' })
  spendingAmount: number;

  @OneToMany(() => ExpenseDetail, (expenseDetails) => expenseDetails.expense, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  expenseDetails: ExpenseDetail[];
}
