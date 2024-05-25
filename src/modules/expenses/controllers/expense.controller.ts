import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateExpenseDto } from '../dtos/expense.dto';

const options: EntityCrudOptions = {
  createDto: CreateExpenseDto,
};

@ApiBearerAuth()
@Controller('expenses')
@ApiTags('Expenses')
export class ExpenseController extends EntityCrudController<Expense>(options) {
  constructor(private readonly expenseService: ExpenseService) {
    super(expenseService);
  }
}
