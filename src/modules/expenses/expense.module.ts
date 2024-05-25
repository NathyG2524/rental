import { Module } from '@nestjs/common';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseService } from './services/expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense, ExpenseDetail } from 'src/entities';
import { ExpenseDetailController } from './controllers/expense-detail.controller';
import { ExpenseDetailService } from './services/expense-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseDetail])],
  controllers: [ExpenseController, ExpenseDetailController],
  providers: [ExpenseService, ExpenseDetailService],
})
export class ExpenseModule {}
