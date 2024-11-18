import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { Notification, Project, ProjectTask } from 'src/entities';
import { REQUEST } from '@nestjs/core';
import { CreateProjectTaskDto } from '../dtos/project-task.dto';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';

@Injectable()
export class ProjectTaskService extends ExtraCrudService<ProjectTask> {
  constructor(
    @InjectRepository(ProjectTask)
    private readonly repositoryProject: Repository<ProjectTask>,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryProject);
  }

  async create(itemData: CreateProjectTaskDto): Promise<any> {
    const item = this.repositoryProject.create(itemData);
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    await Promise.all([
      manager.getRepository(ProjectTask).insert(item),
      manager.getRepository(Notification).insert({
        type: 'ProjectTaskAssignee',
        content: 'You have been assigned as Project Task Assignee',
        employeeId: itemData.assignedEmployeeId,
      }),
      manager.getRepository(Notification).insert({
        type: 'ProjectTaskReviewer',
        content: 'You have been assigned as Project Task Reviewer',
        employeeId: itemData.assignedReviewerId,
      }),
    ]);
  }

  async taskPerEmployee(status: any, assignedEmployeeId: string ) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    return await manager.getRepository(ProjectTask).count({
      where: {
        status,
        assignedEmployeeId,
      }
    })
  }
  
  async projectPerEmployee(status: any, assignedEmployeeId: string ) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    return await manager.getRepository(Project).count({
      where: {
        projectTasks:{
          status,
          assignedEmployeeId,
        }
      }
    })
  }
  async totalProjectPerEmployee( assignedEmployeeId: string ) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    return await manager.getRepository(Project).count({
      where: {
        projectTasks:{
          assignedEmployeeId,
        }
      }
    })
  }
}
