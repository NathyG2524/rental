import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { AccountPayableDetail } from 'src/entities';

@Injectable()
export class AccountPayableDetailService extends ExtraCrudService<AccountPayableDetail> {
  constructor(
    @InjectRepository(AccountPayableDetail)
    private readonly repositoryInvoice: Repository<AccountPayableDetail>,
  ) {
    super(repositoryInvoice);
  }
}
