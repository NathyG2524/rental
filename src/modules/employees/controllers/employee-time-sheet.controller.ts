import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeTimeSheetService } from '../services/employee-time-sheet.service';
import { EmployeeTimeSheet } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateEmployeeTimeSheetDto } from '../dtos/employee-time-sheet.dto';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeTimeSheetDto,
};

@ApiBearerAuth()
@Controller('employee-time-sheets')
@ApiTags('Employee Time Sheets')
export class EmployeeTimeSheetController extends EntityCrudController<EmployeeTimeSheet>(
  options,
) {
  constructor(
    private readonly employeeTimeSheetService: EmployeeTimeSheetService,
  ) {
    super(employeeTimeSheetService);
  }

  @Post('mark-all-as-present')
  async markAllAsPresent() {
    return this.employeeTimeSheetService.markAllAsPresent();
  }
}
