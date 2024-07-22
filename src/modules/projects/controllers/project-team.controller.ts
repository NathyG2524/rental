import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentTeamService } from '../services/department-team.service';
import { DepartmentTeam } from '@entities';
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
export class ProjectTeamController extends ExtraCrudController<DepartmentTeam>(
  options,
) {
  constructor(private readonly projectTeamService: DepartmentTeamService) {
    super(projectTeamService);
  }
}
