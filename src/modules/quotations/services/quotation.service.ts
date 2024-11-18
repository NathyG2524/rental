import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Notification, Quotation } from 'src/entities';
import {
  CollectionQuery,
  FilterOperators,
  QueryConstructor,
} from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';
import { CreateQuotationDto } from '../dtos/quotation.dto';
import { QuotationStatusEnum } from 'src/shared/enums/quotation-status.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';

@Injectable()
export class QuotationService extends EntityCrudService<Quotation> {
  constructor(
    @InjectRepository(Quotation)
    private readonly repositoryQuotation: Repository<Quotation>,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryQuotation);
  }

  async create(itemData: CreateQuotationDto, req: any): Promise<any> {
    const item = this.repositoryQuotation.create(itemData);
    item.reference = 'QT' + Math.floor(100000 + Math.random() * 900000);
    item.quotationRequestedById = req.user.id;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + itemData.validityPeriod);
    item.dueDate = dueDate;
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    await Promise.all([
      manager.getRepository(Quotation).insert(item),
      manager.getRepository(Notification).insert({
        type: 'QuotationApprover',
        content: 'You have been assigned as Quotation Approver',
        employeeId: itemData.quotationApprovedById,
      }),
      manager.getRepository(Notification).insert({
        type: 'QuotationChecker',
        content: 'You have been assigned as Quotation Checker',
        employeeId: itemData.quotationCheckedById,
      }),
    ]);

    return item;
  }

  async findAllForChecking(query: CollectionQuery, user: any) {
    query.where.push([
      {
        column: 'status',
        operator: FilterOperators.EqualTo,
        value: QuotationStatusEnum.REQUESTED,
      },
    ]);
    query.where.push([
      {
        column: 'quotationCheckedById',
        operator: FilterOperators.EqualTo,
        value: user.id,
      },
    ]);

    const dataQuery = QueryConstructor.constructQuery<Quotation>(
      this.repositoryQuotation,
      query,
    );

    return await this.executeQueryResponse<Quotation>(query, dataQuery);
  }

  async findAllForApproval(query: CollectionQuery, user: any) {
    query.where.push([
      {
        column: 'status',
        operator: FilterOperators.EqualTo,
        value: QuotationStatusEnum.CHECKED,
      },
    ]);

    query.where.push([
      {
        column: 'quotationApprovedById',
        operator: FilterOperators.EqualTo,
        value: user.id,
      },
    ]);

    const dataQuery = QueryConstructor.constructQuery<Quotation>(
      this.repositoryQuotation,
      query,
    );

    return await this.executeQueryResponse<Quotation>(query, dataQuery);
  }

  async updateStatusToCheck(id: string, user: any) {
    let item;
    if(user.permissions.includes('ALL') || user.permissions.includes('Admin')){
      item = await this.repositoryQuotation.findOneBy({
        id,
      });
    } else {
      item = await this.repositoryQuotation.findOneBy({
        id,
        quotationCheckedById: user.id,
      });
    }
    

    if (!item) {
      throw new BadRequestException('quotation_not_found');
    }

    await this.repositoryQuotation.update(item.id, {
      status: QuotationStatusEnum.CHECKED,
    });

    return {
      ...item,
      status: QuotationStatusEnum.CHECKED,
    };
  }

  async updateStatusToApproved(id: string, user: any) {
    const item = await this.repositoryQuotation.findOneBy({
      id,
      quotationApprovedById: user.id,
    });

    if (!item) {
      throw new BadRequestException('quotation_not_found');
    }

    await this.repositoryQuotation.update(item.id, {
      status: QuotationStatusEnum.APPROVED,
    });

    return {
      ...item,
      status: QuotationStatusEnum.APPROVED,
    };
  }

  private async executeQueryResponse<T>(
    query: CollectionQuery,
    dataQuery: SelectQueryBuilder<T>,
  ) {
    const response = new DataResponseFormat<T>();
    if (query.count) {
      response.total = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      response.total = total;
      response.items = result;
    }
    return response;
  }
}
