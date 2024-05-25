import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OperatingCostDetailService } from '../services/operating-cost-detail.service';
import { OperatingCostDetail } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateOperatingCostDetailDto } from '../dtos/operating-cost-detail.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'operatingCostId',
  createDto: CreateOperatingCostDetailDto,
};

@ApiBearerAuth()
@Controller('operating-cost-details')
@ApiTags('Operating Cost Details')
export class OperatingCostDetailController extends ExtraCrudController<OperatingCostDetail>(
  options,
) {
  constructor(
    private readonly operatingCostDetailService: OperatingCostDetailService,
  ) {
    super(operatingCostDetailService);
  }
}
