import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { ExpenseDetail } from 'src/entities';

@Injectable()
export class ExpenseDetailService extends ExtraCrudService<ExpenseDetail> {
  constructor(
    @InjectRepository(ExpenseDetail)
    private readonly repositoryInvoice: Repository<ExpenseDetail>,
  ) {
    super(repositoryInvoice);
  }
}
