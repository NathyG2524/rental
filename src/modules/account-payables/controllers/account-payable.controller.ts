import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountPayableService } from '../services/account-payable.service';
import { AccountPayable } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateAccountPayableDto } from '../dtos/account-payable.dto';

const options: EntityCrudOptions = {
  createDto: CreateAccountPayableDto,
};

@ApiBearerAuth()
@Controller('account-payables')
@ApiTags('Account Payables')
export class AccountPayableController extends EntityCrudController<AccountPayable>(
  options,
) {
  constructor(private readonly accountPayableService: AccountPayableService) {
    super(accountPayableService);
  }
}
