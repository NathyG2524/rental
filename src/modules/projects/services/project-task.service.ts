import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { ProjectTask } from 'src/entities';

@Injectable()
export class ProjectTaskService extends ExtraCrudService<ProjectTask> {
  constructor(
    @InjectRepository(ProjectTask)
    private readonly repositoryProject: Repository<ProjectTask>,
  ) {
    super(repositoryProject);
  }
}
