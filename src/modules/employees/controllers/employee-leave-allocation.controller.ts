import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeLeaveAllocation } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { EmployeeLeaveAllocationService } from '../services/employee-leave-allocation.service';
import { CreateEmployeeLeaveAllocationDto } from '../dtos/employee-leave-allocation.dto';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeLeaveAllocationDto,
};

@ApiBearerAuth()
@Controller('employee-leave-allocations')
@ApiTags('Employee Leave Allocations')
export class EmployeeLeaveAllocationController extends EntityCrudController<EmployeeLeaveAllocation>(
  options,
) {
  constructor(
    private readonly lEaLeaveTypeService: EmployeeLeaveAllocationService,
  ) {
    super(lEaLeaveTypeService);
  }
}
