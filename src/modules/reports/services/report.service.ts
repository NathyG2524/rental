import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  AccountPayableDetail,
  AccountReceivableDetail,
  Client,
  Employee,
  EmployeeLeaveRequest,
  Project,
  ProjectTask,
} from 'src/entities';
import {
  AccountPayableStatusEnum,
  AccountReceivableStatusEnum,
} from 'src/shared/enums/account-receivable-status.enum';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { Between, EntityManager, Not } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(@Inject(REQUEST) private request: Request) {}

  async basicEmployeeReport(employeeId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [completedTask, employee, remainingLeaveDays] = await Promise.all([
      manager.getRepository(ProjectTask).countBy({
        assignedEmployeeId: employeeId,
        status: 'Done',
      }),
      manager.getRepository(Employee).findOne({
        where: {
          id: employeeId,
        },
        select: {
          details: true,
        },
      }),
      manager.getRepository(EmployeeLeaveRequest).find({
        where: {
          employeeId,
          status: 'APPROVED',
        },
        select: {
          effectiveFrom: true,
          effectiveTo: true,
        },
      }),
    ]);

    return {
      completedTask,
      totalLeaveTaken: remainingLeaveDays.reduce(
        (a, b) =>
          a +
          Math.round(
            (b.effectiveTo.getTime() - b.effectiveFrom.getTime()) /
              (1000 * 3600 * 24),
          ),
        0,
      ),
      netSalary: employee?.details?.netSalary ?? 0,
    };
  }

  async topLevelReport() {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [project, client, employee] = await Promise.all([
      manager.getRepository(Project).count(),
      manager.getRepository(Client).count(),
      manager.getRepository(Employee).countBy({
        status: Not('Terminated'),
      }),
    ]);

    return {
      project,
      client,
      employee,
    };
  }

  async totalRevenue(type: string, from: Date, to: Date) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [receivable, payable] = await Promise.all([
      manager.getRepository(AccountReceivableDetail).findBy({
        accountReceivable: {
          status: AccountReceivableStatusEnum.RECEIVED,
          dueDate: Between(from, to),
        },
      }),
      manager.getRepository(AccountPayableDetail).findBy({
        accountPayable: {
          status: AccountPayableStatusEnum.PAID,
          dueDate: Between(from, to),
        },
      }),
    ]);

    const totalReceivable = receivable?.reduce((a, b) => a + b.amount, 0) ?? 0;
    const totalPayable = payable?.reduce((a, b) => a + b.amount, 0) ?? 0;

    return {
      totalRevenue: totalReceivable - totalPayable,
    };
  }
}
