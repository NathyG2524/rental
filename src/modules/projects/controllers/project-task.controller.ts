import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectTaskService } from '../services/project-task.service';
import { ProjectTask } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateProjectTaskDto } from '../dtos/project-task.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'projectId',
  createDto: CreateProjectTaskDto,
};

@ApiBearerAuth()
@Controller('project-tasks')
@ApiTags('Project Tasks')
export class ProjectTaskController extends ExtraCrudController<ProjectTask>(
  options,
) {
  constructor(private readonly projectTeamService: ProjectTaskService) {
    super(projectTeamService);
  }

  @Get('task-per-employee/:status/:employeeId')
  async taskPerEmploye(
    @Param('status') status: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.projectTeamService.taskPerEmployee(status, employeeId);
  }

  @Get('project-per-employee/:status/:employeeId')
  async projectPerEmploye(
    @Param('status') status: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.projectTeamService.projectPerEmployee(status, employeeId);
  }

  @Get('total-project-per-employee/:employeeId')
  async totalProjectPerEmploye(@Param('employeeId') employeeId: string) {
    return await this.projectTeamService.totalProjectPerEmployee(employeeId);
  }
}
