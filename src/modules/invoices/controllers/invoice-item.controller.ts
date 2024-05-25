import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceItemService } from '../services/invoice-item.service';
import { InvoiceItem } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateInvoiceItemDto } from '../dtos/invoice-item.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'invoiceId',
  createDto: CreateInvoiceItemDto,
};

@ApiBearerAuth()
@Controller('invoice-items')
@ApiTags('Invoice Items')
export class InvoiceItemController extends ExtraCrudController<InvoiceItem>(
  options,
) {
  constructor(private readonly invoiceItemService: InvoiceItemService) {
    super(invoiceItemService);
  }
}
