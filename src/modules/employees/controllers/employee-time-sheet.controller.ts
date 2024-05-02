import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeTimeSheetService } from '../services/employee-time-sheet.service';
import { EmployeeTimeSheet } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';

const options: EntityCrudOptions = {};

@ApiBearerAuth()
@Controller('employeeTimeSheets')
@ApiTags('EmployeeTimeSheets')
export class EmployeeTimeSheetController extends EntityCrudController<EmployeeTimeSheet>(
  options,
) {
  constructor(
    private readonly employeeTimeSheetService: EmployeeTimeSheetService,
  ) {
    super(employeeTimeSheetService);
  }
}
