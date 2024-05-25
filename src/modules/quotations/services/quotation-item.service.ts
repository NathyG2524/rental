import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { QuotationItem } from 'src/entities';

@Injectable()
export class QuotationItemService extends ExtraCrudService<QuotationItem> {
  constructor(
    @InjectRepository(QuotationItem)
    private readonly repositoryQuotation: Repository<QuotationItem>,
  ) {
    super(repositoryQuotation);
  }
}
