import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectTeamService } from '../services/project-team.service';
import { ProjectTeam } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateProjectTeamDto } from '../dtos/project-team.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'projectId',
  createDto: CreateProjectTeamDto,
};

@ApiBearerAuth()
@Controller('project-teams')
@ApiTags('Project Teams')
export class ProjectTeamController extends ExtraCrudController<ProjectTeam>(
  options,
) {
  constructor(private readonly projectTeamService: ProjectTeamService) {
    super(projectTeamService);
  }
}
