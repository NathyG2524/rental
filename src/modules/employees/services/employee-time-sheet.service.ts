import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Employee, EmployeeTimeSheet } from 'src/entities';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import {
  CollectionQuery,
  FilterOperators,
  QueryConstructor,
} from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class EmployeeTimeSheetService extends EntityCrudService<EmployeeTimeSheet> {
  constructor(
    @InjectRepository(EmployeeTimeSheet)
    private readonly repositoryEmployeeTimeSheet: Repository<EmployeeTimeSheet>,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryEmployeeTimeSheet);
  }

  async getEmployeeTimeSheet(query: CollectionQuery) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    const employeeRepository = manager.getRepository(Employee);

    query.where.push([
      {
        column: 'status',
        operator: FilterOperators.EqualTo,
        value: 'Active',
      },
    ]);

    const dataQuery = QueryConstructor.constructQuery<Employee>(
      employeeRepository,
      query,
    ).leftJoinAndSelect(
      'employees.employeeTimeSheets',
      'employeeTimeSheets',
      'employeeTimeSheets.date =:today',
      {
        today: new Date(),
      },
    );

    const response = new DataResponseFormat<Employee>();
    if (query.count) {
      response.total = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      response.total = total;
      response.items = result;
    }
    return response;
  }

  async markAllAsPresent() {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const employees = await manager.getRepository(Employee).find({
      where: {
        status: 'Active',
      },
      select: ['id'],
    });

    const employeeTimeSheets = employees.map((employee) => {
      return this.repositoryEmployeeTimeSheet.create({
        employeeId: employee.id,
        status: 'PRESENT',
      });
    });

    await this.repositoryEmployeeTimeSheet.upsert(employeeTimeSheets, {
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['employeeId', 'date'],
    });
  }
}
