import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { Project } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateProjectDto } from '../dtos/project.dto';
import { decodeCollectionQuery } from 'src/shared/collection-query';
import { AllowAnonymous } from 'src/shared/authorization';

const options: ExtraCrudOptions = {
  entityIdName: 'quotationId',
  createDto: CreateProjectDto,
};

@ApiBearerAuth()
@Controller('projects')
@ApiTags('Projects')
export class ProjectController extends ExtraCrudController<Project>(options) {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }

  @Get('/items/:quotationId')
  async fetchItemsByQuotation(@Param('quotationId') quotationId: string) {
    return await this.projectService.fetchItemsByQuotation(quotationId);
  }

  @Get('fetch')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  @AllowAnonymous()
  async fetchAll(@Query('q') q: string) {
    const query = decodeCollectionQuery(q);
    return this.projectService.fetchAll(query);
  }

  @Get('employee/:assignedEmployeeId')
  @AllowAnonymous()
  async projectsPerEmployee(
    @Param('assignedEmployeeId') assignedEmployeeId: string,
    @Query('q') q: string,
  ) {
    const query = decodeCollectionQuery(q);
    return await this.projectService.projectsPerEmployee(
      assignedEmployeeId,
      query,
    );
  }

  @Get('department/:departmentId')
  async projectsPerDepartment(
    @Param('departmentId') departmentId: string,
    @Query('q') q: string,
  ) {
    const query = decodeCollectionQuery(q);
    return await this.projectService.projectsPerDepartment(departmentId, query);
  }
}
