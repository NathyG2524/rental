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

  async profitByClient() {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [receivable, payable] = await Promise.all([
      manager.getRepository(AccountReceivableDetail).find({
        where: {
          accountReceivable: {
            status: AccountReceivableStatusEnum.RECEIVED,
          },
        },
        select: {
          paid: true,
          project: {
            client: {
              id: true,
              name: true,
            },
          },
        },
        relations: {
          project: {
            client: true,
          },
        },
      }),
      manager.getRepository(AccountPayableDetail).find({
        where: {
          accountPayable: {
            status: AccountPayableStatusEnum.PAID,
          },
        },
        select: {
          paid: true,
        },
        relations: {
          project: {
            client: true,
          },
        },
      }),
    ]);

    const receivablesByClient = this.groupByClient(receivable);
    const payableByClient = this.groupByClient(payable);

    const revenueByClient = {};

    const allClientIds = new Set([
      ...Object.keys(payableByClient),
      ...Object.keys(receivablesByClient),
    ]);

    allClientIds.forEach((clientId) => {
      const receivableTotal = receivablesByClient[clientId] || 0;
      const payableTotal = payableByClient[clientId] || 0;

      // Calculate revenue for each client
      revenueByClient[clientId] = receivableTotal - payableTotal;
    });

    return revenueByClient;
  }

  async totalRevenue(type: string, from: Date, to: Date) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [receivable, payable] = await Promise.all([
      manager.getRepository(AccountReceivableDetail).find({
        where: {
          accountReceivable: {
            status: AccountReceivableStatusEnum.RECEIVED,
            dueDate: Between(from, to),
          },
        },
        select: {
          paid: true,
          accountReceivable: {
            dueDate: true,
          },
        },
        relations: {
          accountReceivable: true,
        },
      }),
      manager.getRepository(AccountPayableDetail).find({
        where: {
          accountPayable: {
            status: AccountPayableStatusEnum.PAID,
            dueDate: Between(from, to),
          },
        },
        select: {
          paid: true,
          accountPayable: {
            dueDate: true,
          },
        },
        relations: {
          accountPayable: true,
        },
      }),
    ]);

    return this.handleMonthlyReport(receivable, payable);
  }

  private handleMonthlyReport(receivable: any, payable: any) {
    const receivablesByMonth = this.groupByMonth(receivable);
    const payableByMonth = this.groupByMonth(payable);

    const revenueByMonth = {};
    for (const month in payableByMonth) {
      revenueByMonth[month] = receivablesByMonth[month] - payableByMonth[month];
    }

    return revenueByMonth;
  }

  private groupByClient(data: any) {
    return data.reduce((acc: any, curr: any) => {
      const clientId = curr.project.client.id;
      const clientName = curr.project.client.name;

      // If the client already exists in the accumulator, add the paid amount
      if (acc[clientName]) {
        acc[clientName] += curr.paid;
      } else {
        // Otherwise, initialize with the paid amount
        acc[clientName] = curr.paid;
      }

      return acc;
    }, {});
  }

  private groupByMonth(data: any) {
    // Initialize all months with 0
    const months = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    data.forEach((item: any) => {
      // Extract the month from the dueDate
      const month = new Date(item.accountPayable.dueDate).toLocaleString(
        'default',
        { month: 'short' },
      );

      // Add the paid amount to the respective month
      months[month] += item.paid;
    });

    return months;
  }
}
