import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { AccountReceivableDetail } from 'src/entities';

@Injectable()
export class AccountReceivableDetailService extends ExtraCrudService<AccountReceivableDetail> {
  constructor(
    @InjectRepository(AccountReceivableDetail)
    private readonly repositoryInvoice: Repository<AccountReceivableDetail>,
  ) {
    super(repositoryInvoice);
  }
}
