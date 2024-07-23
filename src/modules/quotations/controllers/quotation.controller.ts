import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QuotationService } from '../services/quotation.service';
import { Quotation } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateQuotationDto } from '../dtos/quotation.dto';
import { decodeCollectionQuery } from 'src/shared/collection-query';
import { CurrentUser } from 'src/shared/authorization';

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

  @Get('for-checking')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  async findAllForChecking(@Query('q') q?: string, @CurrentUser() user?: any) {
    const query = decodeCollectionQuery(q);
    return this.quotationService.findAllForChecking(query, user);
  }

  @Get('for-approval')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  async findAllForApproval(@Query('q') q?: string, @CurrentUser() user?: any) {
    const query = decodeCollectionQuery(q);
    return this.quotationService.findAllForApproval(query, user);
  }

  @Put('update-to-checked/:id')
  async updateStatusToCheck(@Param('id') id: string, @CurrentUser() user: any) {
    return this.quotationService.updateStatusToCheck(id, user);
  }

  @Put('update-to-approved/:id')
  async updateStatusToApproved(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.quotationService.updateStatusToApproved(id, user);
  }
}
