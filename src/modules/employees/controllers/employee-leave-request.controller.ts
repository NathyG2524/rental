import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeLeaveRequest } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { EmployeeLeaveRequestService } from '../services/employee-leave-request.service';
import { CreateEmployeeLeaveRequestDto } from '../dtos/employee-leave-request.dto';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeLeaveRequestDto,
};

@ApiBearerAuth()
@Controller('employee-leave-requests')
@ApiTags('Employee Leave Requests')
export class EmployeeLeaveRequestController extends EntityCrudController<EmployeeLeaveRequest>(
  options,
) {
  constructor(
    private readonly lEaLeaveTypeService: EmployeeLeaveRequestService,
  ) {
    super(lEaLeaveTypeService);
  }
}
