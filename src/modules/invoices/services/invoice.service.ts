import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import {
  AccountPayable,
  AccountReceivable,
  Invoice,
  Notification,
  Quotation,
} from 'src/entities';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { QuotationStatusEnum } from 'src/shared/enums/quotation-status.enum';
import { ConvertQuotationDto } from '../dtos/invoice.dto';
import { InvoiceStatusEnum } from 'src/shared/enums/invoice-status.enum';
import {
  AccountPayableStatusEnum,
  AccountReceivableStatusEnum,
} from 'src/shared/enums/account-receivable-status.enum';

@Injectable()
export class InvoiceService extends EntityCrudService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly repositoryInvoice: Repository<Invoice>,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryInvoice);
  }

  async convertQuotation(payload: ConvertQuotationDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const quotation = await manager.getRepository(Quotation).findOne({
      where: {
        id: payload.quotationId,
      },
      relations: {
        projects: {
          projectItems: true,
        },
      },
    });

    if (!quotation) {
      throw new BadRequestException('quotation_not_found');
    } else if (quotation.status == QuotationStatusEnum.CONVERTED) {
      throw new BadRequestException('quotation_has_been_converted');
    }

    const invoiceItems = [];
    quotation.projects.forEach((project) => {
      project.projectItems.forEach((item) => {
        invoiceItems.push({
          ...item,
          unit: item.quantity,
          amount: item.unitPrice,
          projectId: project.id,
          id: undefined,
        });
      });
    });

    const invoice = manager.getRepository(Invoice).create({
      ...quotation,
      id: undefined,
      reference: 'IN' + Math.floor(100000 + Math.random() * 900000),
      status: InvoiceStatusEnum.NOT_PAID,
      invoiceRequestedById: quotation.quotationRequestedById,
      invoiceCheckedById: quotation.quotationCheckedById,
      invoiceApprovedById: quotation.quotationApprovedById,
      invoiceItems: invoiceItems,
    });

    await Promise.all([
      await manager.getRepository(Invoice).save(invoice),

      await manager.getRepository(Quotation).update(quotation.id, {
        status: QuotationStatusEnum.CONVERTED,
      }),

      manager.getRepository(Notification).insert({
        type: 'InvoiceChecker',
        content: 'You have been assigned as Invoice Checker',
        employeeId: quotation.quotationCheckedById,
      }),
      manager.getRepository(Notification).insert({
        type: 'InvoiceApprover',
        content: 'You have been assigned as Invoice Approver',
        employeeId: quotation.quotationApprovedById,
      }),
    ]);

    const accountReceivable = manager.getRepository(AccountReceivable).create({
      ...quotation,
      id: undefined,
      reference: 'AR' + Math.floor(100000 + Math.random() * 900000),
      status: AccountReceivableStatusEnum.NOT_RECEIVED,
      invoiceId: invoice.id,
      accountReceivableDetails: {
        ...invoiceItems,
        dueDate: quotation.dueDate,
      } as any,
    });

    const accountPayable = manager.getRepository(AccountPayable).create({
      ...quotation,
      id: undefined,
      reference: 'AP' + Math.floor(100000 + Math.random() * 900000),
      invoiceId: invoice.id,
      status: AccountPayableStatusEnum.NOT_PAID,
    });

    await Promise.all([
      manager.getRepository(AccountReceivable).save(accountReceivable),
      manager.getRepository(AccountPayable).save(accountPayable),
    ]);

    return invoice;
  }
}
