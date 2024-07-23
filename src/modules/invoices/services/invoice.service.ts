import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Invoice, Quotation } from 'src/entities';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { QuotationStatusEnum } from 'src/shared/enums/quotation-status.enum';
import { ConvertQuotationDto } from '../dtos/invoice.dto';

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
    } else if (quotation.status == QuotationStatusEnum.APPROVED) {
      throw new BadRequestException('quotation_has_been_approved');
    } else if (quotation.status == QuotationStatusEnum.CONVERTED) {
      throw new BadRequestException('quotation_has_been_converted');
    }

    const invoiceItems = [];
    quotation.projects.forEach((project) => {
      project.projectItems.forEach((item) => {
        invoiceItems.push({
          ...item,
          id: null,
        });
      });
    });

    const invoice = manager.getRepository(Invoice).create({
      ...quotation,
      id: null,
      invoiceItems: invoiceItems,
    });

    await manager.getRepository(Invoice).save(invoice);
    await manager.getRepository(Quotation).update(quotation.id, {
      status: QuotationStatusEnum.CONVERTED,
    });

    return invoice;
  }
}
