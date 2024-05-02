import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Project } from 'src/entities';

@Injectable()
export class ProjectService extends EntityCrudService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly repositoryProject: Repository<Project>,
  ) {
    super(repositoryProject);
  }
}
