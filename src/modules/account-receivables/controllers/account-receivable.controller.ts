import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountReceivableService } from '../services/account-receivable.service';
import { AccountReceivable } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateAccountReceivableDto } from '../dtos/account-receivable.dto';

const options: EntityCrudOptions = {
  createDto: CreateAccountReceivableDto,
};

@ApiBearerAuth()
@Controller('account-receivables')
@ApiTags('Account Receivables')
export class AccountReceivableController extends EntityCrudController<AccountReceivable>(
  options,
) {
  constructor(
    private readonly accountReceivableService: AccountReceivableService,
  ) {
    super(accountReceivableService);
  }
}
