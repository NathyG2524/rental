import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountPayableDetailService } from '../services/account-payable-detail.service';
import { AccountPayableDetail } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateAccountPayableDetailDto } from '../dtos/account-payable-detail.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'accountPayableId',
  createDto: CreateAccountPayableDetailDto,
};

@ApiBearerAuth()
@Controller('account-payable-details')
@ApiTags('Account Payable Details')
export class AccountPayableDetailController extends ExtraCrudController<AccountPayableDetail>(
  options,
) {
  constructor(
    private readonly accountPayableDetailService: AccountPayableDetailService,
  ) {
    super(accountPayableDetailService);
  }
}
