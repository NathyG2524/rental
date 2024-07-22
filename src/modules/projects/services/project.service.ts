import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { Project } from 'src/entities';

@Injectable()
export class ProjectService extends ExtraCrudService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly repositoryProject: Repository<Project>,
  ) {
    super(repositoryProject);
  }

  async fetchItemsByQuotation(quotationId: string) {
    return await this.repositoryProject.find({
      where: {
        quotationId: quotationId,
      },
      relations: {
        projectItems: true,
      },
    });
  }
}
