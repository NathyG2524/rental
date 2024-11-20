import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { Project } from 'src/entities';
import { CollectionQuery, QueryConstructor } from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ProjectService extends ExtraCrudService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly repositoryProject: Repository<Project>,

    @Inject(REQUEST)
    private readonly request: Request,
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

  async projectsPerEmployee(assignedEmployeeId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const projects = await manager
      .getRepository(Project)
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.projectTasks', 'tasks')
      .groupBy('project.id, tasks.createdAt, tasks.updatedAt, tasks.id') // Group by the parent entity
      .having(
        'COUNT(*) = SUM(CASE WHEN tasks.status = :status AND tasks.assignedEmployeeId = :assignedEmployeeId THEN 1 ELSE 0 END)',
        {
          assignedEmployeeId,
          status: 'Done',
        },
      )
      .getManyAndCount();
      return projects;
  }
  async projectsPerDepartment(departmentId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const projects = await manager
      .getRepository(Project)
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.projectTasks', 'tasks')
      .leftJoinAndSelect('tasks.departmentTeam', 'departmentTeam')
      .groupBy('project.id, tasks.createdAt, tasks.updatedAt, tasks.id') // Group by the parent entity
      .having(
        'COUNT(*) = SUM(CASE WHEN tasks.status = :status AND departmentTeam.departmentId = :departmentId THEN 1 ELSE 0 END)',
        {
          departmentId,
          status: 'Done',
        },
      )
      .getManyAndCount();
      return projects;
  }
}
