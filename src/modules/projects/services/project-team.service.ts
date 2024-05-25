import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { ProjectTeam } from 'src/entities';

@Injectable()
export class ProjectTeamService extends ExtraCrudService<ProjectTeam> {
  constructor(
    @InjectRepository(ProjectTeam)
    private readonly repositoryProject: Repository<ProjectTeam>,
  ) {
    super(repositoryProject);
  }
}
