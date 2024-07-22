import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { Project } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateProjectDto } from '../dtos/project.dto';

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
}
