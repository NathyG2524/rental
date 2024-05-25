import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Quotation } from 'src/entities';

@Injectable()
export class QuotationService extends EntityCrudService<Quotation> {
  constructor(
    @InjectRepository(Quotation)
    private readonly repositoryQuotation: Repository<Quotation>,
  ) {
    super(repositoryQuotation);
  }
}
