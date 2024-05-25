import { Controller } from '@nestjs/common';
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
}
