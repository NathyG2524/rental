import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountReceivableDetailService } from '../services/account-receivable-detail.service';
import { AccountReceivableDetail } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateAccountReceivableDetailDto } from '../dtos/account-receivable-detail.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'accountReceivableId',
  createDto: CreateAccountReceivableDetailDto,
};

@ApiBearerAuth()
@Controller('account-receivable-details')
@ApiTags('Account Receivable Details')
export class AccountReceivableDetailController extends ExtraCrudController<AccountReceivableDetail>(
  options,
) {
  constructor(
    private readonly accountReceivableDetailService: AccountReceivableDetailService,
  ) {
    super(accountReceivableDetailService);
  }
}
