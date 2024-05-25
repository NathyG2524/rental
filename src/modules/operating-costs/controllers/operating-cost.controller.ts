import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OperatingCostService } from '../services/operating-cost.service';
import { OperatingCost } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateOperatingCostDto } from '../dtos/operating-cost.dto';

const options: EntityCrudOptions = {
  createDto: CreateOperatingCostDto,
};

@ApiBearerAuth()
@Controller('operating-costs')
@ApiTags('Operating Costs')
export class OperatingCostController extends EntityCrudController<OperatingCost>(
  options,
) {
  constructor(private readonly operatingCostService: OperatingCostService) {
    super(operatingCostService);
  }
}
