import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateInvoiceDto } from '../dtos/invoice.dto';

const options: EntityCrudOptions = {
  createDto: CreateInvoiceDto,
};

@ApiBearerAuth()
@Controller('invoices')
@ApiTags('Invoices')
export class InvoiceController extends EntityCrudController<Invoice>(options) {
  constructor(private readonly invoiceService: InvoiceService) {
    super(invoiceService);
  }
}
