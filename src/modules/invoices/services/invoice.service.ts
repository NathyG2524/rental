import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Invoice } from 'src/entities';

@Injectable()
export class InvoiceService extends EntityCrudService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly repositoryInvoice: Repository<Invoice>,
  ) {
    super(repositoryInvoice);
  }
}
