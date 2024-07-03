import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import {
  Employee,
  EmployeeLeaveRequest,
  EmployeeTimeSheet,
} from 'src/entities';
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

  async getAttendanceHeatmap(employeeId: string): Promise<any[]> {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    const today = new Date();
    const oneYearBefore = new Date(today);
    oneYearBefore.setFullYear(today.getFullYear() - 1);

    const timeSheets = await this.repositoryEmployeeTimeSheet.find({
      where: { employeeId, date: Between(oneYearBefore, today) },
    });
    const leaves = await manager.getRepository(EmployeeLeaveRequest).find({
      where: {
        employeeId,
        status: 'APPROVED',
        effectiveFrom: MoreThanOrEqual(oneYearBefore),
      },
      relations: {
        leaveType: true,
      },
    });

    const attendanceHeatmap = this.processAttendanceData(timeSheets, leaves);
    return attendanceHeatmap;
  }

  private processAttendanceData(
    timeSheets: EmployeeTimeSheet[],
    leaves: EmployeeLeaveRequest[],
  ): any[] {
    const heatmap = [];
    const timeSheetDates = new Set(timeSheets.map((t) => t.date.toString()));

    const leaveDates = new Map();
    leaves.forEach((leave) => {
      const currentDate = new Date(leave.effectiveFrom);
      const endDate = new Date(leave.effectiveTo);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        leaveDates.set(dateStr, leave.leaveType.name);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    const allDates = [...timeSheetDates, ...leaveDates.keys()].sort();
    const earliestDate = new Date(allDates[0]);
    const latestDate = new Date(allDates[allDates.length - 1]);

    // Generate all dates between earliest and latest dates
    const currentDate = new Date(earliestDate);
    while (currentDate <= latestDate) {
      const dateStr = currentDate.toISOString().split('T')[0];

      if (leaveDates.has(dateStr)) {
        heatmap.push({
          date: dateStr,
          reason: 'LEAVE',
          type: leaveDates.get(dateStr),
        });
      } else if (timeSheetDates.has(dateStr)) {
        heatmap.push({
          date: dateStr,
          reason: 'PRESENT',
          type: '',
        });
      } else {
        heatmap.push({
          date: dateStr,
          reason: 'ABSENT',
          type: '',
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return heatmap;
  }
}
