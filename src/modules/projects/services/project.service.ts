import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { Project } from 'src/entities';
import { CollectionQuery, QueryConstructor } from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';

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

  async fetchAll(query: CollectionQuery) {
    query.includes.push('quotation');

    const dataQuery = QueryConstructor.constructQuery<Project>(
      this.repositoryProject,
      query,
    );
    const response = new DataResponseFormat<Project>();
    if (query.count) {
      response.total = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      response.total = total;
      response.items = result;
    }
    return response;
  }
}
