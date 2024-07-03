import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeeTimeSheetService } from '../services/employee-time-sheet.service';
import { EmployeeTimeSheet } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateEmployeeTimeSheetDto } from '../dtos/employee-time-sheet.dto';
import { AllowAnonymous } from 'src/shared/authorization';
import { decodeCollectionQuery } from 'src/shared/collection-query';

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

  @Post('employee-status')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  @AllowAnonymous()
  async getEmployeeTimeSheet(@Query('q') q?: string) {
    const query = decodeCollectionQuery(q);
    return this.employeeTimeSheetService.getEmployeeTimeSheet(query);
  }

  @Post('mark-all-as-present')
  @AllowAnonymous()
  async markAllAsPresent() {
    return this.employeeTimeSheetService.markAllAsPresent();
  }

  @Get('heatmap/:employeeId')
  @AllowAnonymous()
  async getAttendanceHeatmap(@Param('employeeId') employeeId: string) {
    return this.employeeTimeSheetService.getAttendanceHeatmap(employeeId);
  }
}
