import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from 'src/shared/authorization';

@Controller('report')
@ApiTags('Reports')
@AllowAnonymous()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('department-report/:departmentId')
  async departmentReport(@Param('departmentId') departmentId: string) {
    return await this.reportService.departmentReport(departmentId);
  }

  @Get('department-team-report/:departmentTeamId')
  async departmentTeamReport(
    @Param('departmentTeamId') departmentTeamId: string,
  ) {
    return await this.reportService.departmentTeamReport(departmentTeamId);
  }

  @Get('quotation-report/:quotationId')
  async quotationReport(@Param('quotationId') quotationId: string) {
    return await this.reportService.quotationReport(quotationId);
  }

  @Get('crm-report/')
  async crmReport() {
    return await this.reportService.crmReport();
  }

  @Get('top-level')
  async topLevelReport() {
    return await this.reportService.topLevelReport();
  }

  @Get('total-profit/:from/:to')
  async profitByClient(@Param('from') from: Date, @Param('to') to: Date) {
    return await this.reportService.profitByClient(from, to);
  }

  @Get('total-revenue/:type')
  async totalRevenue(@Param('type') type: string) {
    return await this.reportService.totalRevenue(type);
  }

  @Get('employee/:employeeId')
  async basicEmployeeReport(@Param('employeeId') employeeId: string) {
    return await this.reportService.basicEmployeeReport(employeeId);
  }
}
