import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuotationItemService } from '../services/quotation-item.service';
import { QuotationItem } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateQuotationItemDto } from '../dtos/quotation-item.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'quotationId',
  createDto: CreateQuotationItemDto,
};

@ApiBearerAuth()
@Controller('quotation-items')
@ApiTags('Quotation Items')
export class QuotationItemController extends ExtraCrudController<QuotationItem>(
  options,
) {
  constructor(private readonly quotationItemService: QuotationItemService) {
    super(quotationItemService);
  }
}
