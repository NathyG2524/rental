import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { InvoiceItem } from 'src/entities';

@Injectable()
export class InvoiceItemService extends ExtraCrudService<InvoiceItem> {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly repositoryInvoice: Repository<InvoiceItem>,
  ) {
    super(repositoryInvoice);
  }
}
