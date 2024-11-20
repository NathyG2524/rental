import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExchangeService } from '../services/exchange.service';
import { Exchange } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateExchangeDto } from '../dtos/exchange.dto';

const options: EntityCrudOptions = {
  createDto: CreateExchangeDto,
};

@ApiBearerAuth()
@Controller('exchange')
@ApiTags('Exchanges')
export class ExchangeController extends EntityCrudController<Exchange>(
  options,
) {
  constructor(private readonly exchangeService: ExchangeService) {
    super(exchangeService);
  }
}
