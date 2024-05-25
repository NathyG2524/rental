import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Expense } from 'src/entities';

@Injectable()
export class ExpenseService extends EntityCrudService<Expense> {
  constructor(
    @InjectRepository(Expense)
    private readonly repositoryExpense: Repository<Expense>,
  ) {
    super(repositoryExpense);
  }
}
