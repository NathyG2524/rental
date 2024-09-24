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
  Vendor,
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

    const [completedProject, completedTask, employee, remainingLeaveDays] =
      await Promise.all([
        manager.getRepository(Project).count({
          where: {
            projectTasks: {
              assignedEmployeeId: employeeId,
              status: 'Done',
            },
          },
        }),
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
      completedProject,
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

  async departmentReport(departmentId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [totalProject, completedProject] = await Promise.all([
      manager.getRepository(Project).count({
        where: {
          projectTasks: {
            departmentTeam: {
              departmentId,
            },
          },
        },
      }),
      manager.getRepository(Project).count({
        where: {
          projectTasks: {
            departmentTeam: {
              departmentId,
            },
            status: 'Done',
          },
        },
      }),
    ]);

    return {
      totalProject,
      completedProject,
    };
  }

  async departmentTeamReport(departmentTeamId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [totalProject, completedProject] = await Promise.all([
      manager.getRepository(Project).count({
        where: {
          projectTasks: {
            departmentTeamId,
          },
        },
      }),
      manager.getRepository(Project).count({
        where: {
          projectTasks: {
            departmentTeamId,
            status: 'Done',
          },
        },
      }),
    ]);

    return {
      totalProject,
      completedProject,
    };
  }

  async quotationReport(quotationId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [totalProject, completedProject, totalEmployee] = await Promise.all([
      manager.getRepository(ProjectTask).count({
        where: {
          project: {
            quotationId,
          },
          status: 'Done',
        },
      }),
      manager.getRepository(ProjectTask).count({
        where: {
          project: {
            quotationId,
          },
          status: Not('Done'),
        },
      }),
      manager.getRepository(Employee).count({
        where: {
          assignedEmployees: {
            project: {
              quotationId,
            },
          },
        },
      }),
    ]);

    return {
      totalProject,
      completedProject,
      totalEmployee,
    };
  }

  async crmReport() {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [totalClient, totalProject, totalVendor] = await Promise.all([
      manager.getRepository(Client).count(),
      manager.getRepository(Project).count(),
      manager.getRepository(Vendor).count(),
    ]);

    return {
      totalClient,
      totalProject,
      totalVendor,
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

  async profitByClient(from: Date, to: Date) {
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
            dueDate: Between(from, to),
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

    const revenueByClient = [];

    const allClientIds = new Set([
      ...Object.keys(payableByClient),
      ...Object.keys(receivablesByClient),
    ]);

    allClientIds.forEach((clientId) => {
      const receivableTotal = receivablesByClient[clientId] || 0;
      const payableTotal = payableByClient[clientId] || 0;

      // Calculate revenue for each client
      revenueByClient.push({
        client: clientId,
        profit: receivableTotal - payableTotal,
      });
    });

    return revenueByClient;
  }

  async totalRevenue(type: string) {
    const { from, to } = this.getDates(type);
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

    if (type == 'annually') {
      return this.handleMonthlyReport(receivable, payable);
    } else if (type == 'weekly') {
      return this.handleWeeklyReport(receivable, payable, from, to);
    } else if (type == 'daily') {
      return this.handleDailyReport(receivable, payable, from, to);
    }
  }

  async receivableReport(type: string) {
    const { from, to } = this.getDates(type);
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const receivable = await manager
      .getRepository(AccountReceivableDetail)
      .find({
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
      });
    const revenueByMonth = [];

    if (type == 'annually') {
      const grouped = this.groupByMonth(receivable);
      for (const month in grouped) {
        revenueByMonth.push({
          month,
          revenue: grouped[month],
        });
      }
    } else if (type == 'weekly') {
      const reportReceivable = this.groupByTimePeriods(receivable, from, to);

      for (const month in reportReceivable.weeks) {
        revenueByMonth.push({
          month,
          revenue: reportReceivable.weeks[month],
        });
      }
    } else if (type == 'daily') {
      const reportReceivable = this.groupByTimePeriods(receivable, from, to);
      for (const month in reportReceivable.days) {
        revenueByMonth.push({
          month,
          revenue: reportReceivable.days[month],
        });
      }
    }

    return revenueByMonth;
  }

  async payableReport(type: string) {
    const { from, to } = this.getDates(type);
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const payable = await manager.getRepository(AccountPayableDetail).find({
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
    });
    const revenueByMonth = [];

    if (type == 'annually') {
      const grouped = this.groupByMonth(payable);
      for (const month in grouped) {
        revenueByMonth.push({
          month,
          revenue: grouped[month],
        });
      }
    } else if (type == 'weekly') {
      const reportReceivable = this.groupByTimePeriods(payable, from, to);

      for (const month in reportReceivable.weeks) {
        revenueByMonth.push({
          month,
          revenue: reportReceivable.weeks[month],
        });
      }
    } else if (type == 'daily') {
      const reportReceivable = this.groupByTimePeriods(payable, from, to);
      for (const month in reportReceivable.days) {
        revenueByMonth.push({
          month,
          revenue: reportReceivable.days[month],
        });
      }
    }

    return revenueByMonth;
  }

  private getDates(type: string) {
    const to = new Date();
    if (type === 'annually') {
      const from = new Date(to.getFullYear(), 0, 1);
      return {
        from,
        to,
      };
    } else {
      const from = new Date(to.getFullYear(), to.getMonth(), 1);
      return {
        from,
        to,
      };
    }
    // else if (type === 'weekly') {
    //   const from = new Date(to.getFullYear(), to.getMonth(), 1);
    //   return {
    //     from,
    //     to,
    //   };
    // } else {
    //   const from = new Date(to);
    //   from.setDate(to.getDate() - to.getDay());
    //   return {
    //     from,
    //     to,
    //   };
    // }
  }

  private handleMonthlyReport(receivable: any, payable: any) {
    const receivablesByMonth = this.groupByMonth(receivable);
    const payableByMonth = this.groupByMonth(payable);

    const revenueByMonth = [];
    for (const month in payableByMonth) {
      revenueByMonth.push({
        month,
        revenue: receivablesByMonth[month] - payableByMonth[month],
      });
    }

    return revenueByMonth;
  }

  private handleWeeklyReport(
    receivable: any,
    payable: any,
    startDate: Date,
    endDate: Date,
  ) {
    const reportReceivable = this.groupByTimePeriods(
      receivable,
      startDate,
      endDate,
    );

    const reportPayable = this.groupByTimePeriods(payable, startDate, endDate);

    const receivablesByMonth = reportReceivable.weeks;
    const payableByMonth = reportPayable.weeks;

    const revenueByMonth = [];
    for (const month in payableByMonth) {
      revenueByMonth.push({
        month,
        revenue: receivablesByMonth[month] - payableByMonth[month],
      });
    }

    return revenueByMonth;
  }

  private handleDailyReport(
    receivable: any,
    payable: any,
    startDate: Date,
    endDate: Date,
  ) {
    const reportReceivable = this.groupByTimePeriods(
      receivable,
      startDate,
      endDate,
    );

    const reportPayable = this.groupByTimePeriods(payable, startDate, endDate);

    const receivablesByMonth = reportReceivable.days;
    const payableByMonth = reportPayable.days;

    const revenueByMonth = [];
    for (const month in payableByMonth) {
      revenueByMonth.push({
        month,
        revenue: receivablesByMonth[month] - payableByMonth[month],
      });
    }

    return revenueByMonth;
  }

  private groupByClient(data: any) {
    return data.reduce((acc: any, curr: any) => {
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

  private groupByTimePeriods(data: any, startDate: Date, endDate: Date) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Initialize objects for weekly and daily grouping
    const weeks: any = {};
    const days: any = {};

    // Helper to add days to a date
    const addDays = (date: Date, days: number) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    // Generate all dates between startDate and endDate
    let currentDate = new Date(start);
    while (currentDate <= end) {
      // Format day as YYYY-MM-DD and set initial value to 0
      const dayKey = currentDate.toISOString().split('T')[0];
      days[dayKey] = 0;

      // Get week number for the current date and set initial value to 0 for weeks
      const weekNumber = this.getWeekNumber(currentDate);
      const year = currentDate.getFullYear();
      const weekKey = `Week ${weekNumber}, ${year}`;
      weeks[weekKey] = 0;

      // Move to the next day
      currentDate = addDays(currentDate, 1);
    }

    // Now iterate over the data to populate actual paid amounts
    data.forEach((item: any) => {
      const date = new Date(item.accountPayable.dueDate);

      // Check if the date is within the start and end range
      if (date >= start && date <= end) {
        // Group by Week
        const weekNumber = this.getWeekNumber(date);
        const year = date.getFullYear();
        const weekKey = `Week ${weekNumber}, ${year}`;
        weeks[weekKey] += item.paid;

        // Group by Day
        const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        days[dayKey] += item.paid;
      }
    });

    return { weeks, days };
  }

  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }
}
