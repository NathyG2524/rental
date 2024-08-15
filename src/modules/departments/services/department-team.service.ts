import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { DepartmentTeam } from 'src/entities';
import { CollectionQuery, QueryConstructor } from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class DepartmentTeamService extends ExtraCrudService<DepartmentTeam> {
  constructor(
    @InjectRepository(DepartmentTeam)
    private readonly repositoryDepartment: Repository<DepartmentTeam>,
  ) {
    super(repositoryDepartment);
  }

  async fetchAll(query: CollectionQuery) {
    const dataQuery = QueryConstructor.constructQuery<DepartmentTeam>(
      this.repositoryDepartment,
      query,
    );
    const response = new DataResponseFormat<DepartmentTeam>();
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
