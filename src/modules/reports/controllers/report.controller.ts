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

  @Get('project-report/:projectId')
  async projectReport(@Param('projectId') projectId: string) {
    return await this.reportService.projectReport(projectId);
  }

  @Get('project-report/:projectId/:type')
  @AllowAnonymous()
  async aggregatedProjectReport(
    @Param('projectId') projectId: string,
    @Param('type') type: string,
  ) {
    return await this.reportService.aggregatedProjectReport(projectId, type);
  }

  @Get('vendor-report/:vendorId/:type')
  @AllowAnonymous()
  async aggregatedVendorReport(
    @Param('vendorId') vendorId: string,
    @Param('type') type: string,
  ) {
    return await this.reportService.aggregatedVendorReport(vendorId, type);
  }

  @Get('operation-cost-report/:type')
  @AllowAnonymous()
  async operationCostReport(@Param('type') type: string) {
    return await this.reportService.operationCostReport(type);
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
  @AllowAnonymous()
  async totalRevenue(@Param('type') type: string) {
    return await this.reportService.totalRevenue(type);
  }

  @Get('receivable/:type')
  @AllowAnonymous()
  async receivableReport(@Param('type') type: string) {
    return await this.reportService.receivableReport(type);
  }

  @Get('payable/:type')
  @AllowAnonymous()
  async payableReport(@Param('type') type: string) {
    return await this.reportService.payableReport(type);
  }

  @Get('stared-project/:type')
  @AllowAnonymous()
  async startedProjectReport(@Param('type') type: string) {
    return await this.reportService.startedProjectReport(type);
  }

  @Get('employee-project/:type/:status/:employeeId')
  @AllowAnonymous()
  async employeeProjectReport(
    @Param('type') type: string,
    @Param('status') status: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.reportService.employeeProjectReport(type, status, employeeId);
  }

  @Get('employee/:employeeId')
  async basicEmployeeReport(@Param('employeeId') employeeId: string) {
    return await this.reportService.basicEmployeeReport(employeeId);
  }

  @Get('social-media-report')
  @AllowAnonymous()
  async socialMediaReport() {
    return await this.reportService.socialMediaReport();
  }
}
