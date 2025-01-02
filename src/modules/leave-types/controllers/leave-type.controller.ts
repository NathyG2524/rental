import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeaveTypeService } from '../services/leave-type.service';
import { LeaveType } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateLeaveTypeDto } from '../dtos/leave-type.dto';

const options: EntityCrudOptions = {
  createDto: CreateLeaveTypeDto,
};

@ApiBearerAuth()
@Controller('leave-types')
@ApiTags('Leave Types')
export class LeaveTypeController extends EntityCrudController<LeaveType>(
  options,
) {
  constructor(private readonly leaveTypeService: LeaveTypeService) {
    super(leaveTypeService);
  }
}
