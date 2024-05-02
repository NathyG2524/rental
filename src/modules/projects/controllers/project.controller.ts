import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { Project } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateProjectDto } from '../dtos/project.dto';

const options: EntityCrudOptions = {
  createDto: CreateProjectDto,
};

@ApiBearerAuth()
@Controller('projects')
@ApiTags('Projects')
export class ProjectController extends EntityCrudController<Project>(options) {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }
}
