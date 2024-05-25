import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuotationService } from '../services/quotation.service';
import { Quotation } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateQuotationDto } from '../dtos/quotation.dto';

const options: EntityCrudOptions = {
  createDto: CreateQuotationDto,
};

@ApiBearerAuth()
@Controller('quotations')
@ApiTags('Quotations')
export class QuotationController extends EntityCrudController<Quotation>(
  options,
) {
  constructor(private readonly quotationService: QuotationService) {
    super(quotationService);
  }
}
