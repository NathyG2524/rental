import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Employee, EmployeeTimeSheet } from 'src/entities';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';

@Injectable()
export class EmployeeTimeSheetService extends EntityCrudService<EmployeeTimeSheet> {
  constructor(
    @InjectRepository(EmployeeTimeSheet)
    private readonly repositoryEmployeeTimeSheet: Repository<EmployeeTimeSheet>,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryEmployeeTimeSheet);
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
      });
    });

    await this.repositoryEmployeeTimeSheet.insert(employeeTimeSheets);
  }
}
