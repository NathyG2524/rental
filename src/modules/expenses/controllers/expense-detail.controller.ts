import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExpenseDetailService } from '../services/expense-detail.service';
import { ExpenseDetail } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateExpenseDetailDto } from '../dtos/expense-detail.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'expenseId',
  createDto: CreateExpenseDetailDto,
};

@ApiBearerAuth()
@Controller('expense-details')
@ApiTags('Expense Details')
export class ExpenseDetailController extends ExtraCrudController<ExpenseDetail>(
  options,
) {
  constructor(private readonly expenseDetailService: ExpenseDetailService) {
    super(expenseDetailService);
  }
}
