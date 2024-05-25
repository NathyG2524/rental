import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VendorTaskService } from '../services/vendor-task.service';
import { VendorTask } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateVendorTaskDto } from '../dtos/vendor-task.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'vendorId',
  createDto: CreateVendorTaskDto,
};

@ApiBearerAuth()
@Controller('vendor-tasks')
@ApiTags('Vendor Tasks')
export class VendorTaskController extends ExtraCrudController<VendorTask>(
  options,
) {
  constructor(private readonly vendorService: VendorTaskService) {
    super(vendorService);
  }
}
