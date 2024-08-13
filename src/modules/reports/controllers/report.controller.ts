import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from 'src/shared/authorization';

@Controller('report')
@ApiTags('Reports')
@AllowAnonymous()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-level')
  async topLevelReport() {
    return await this.reportService.topLevelReport();
  }

  @Get('total-revenue/:type/from/:from/to/:to')
  async totalRevenue(
    @Param('type') type: string,
    @Param('from') from: Date,
    @Param('to') to: Date,
  ) {
    return await this.reportService.totalRevenue(type, from, to);
  }

  @Get('employee/:employeeId')
  async basicEmployeeReport(@Param('employeeId') employeeId: string) {
    return await this.reportService.basicEmployeeReport(employeeId);
  }
}
