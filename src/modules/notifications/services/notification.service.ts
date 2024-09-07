import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Notification } from 'src/entities';
import {
  CollectionQuery,
  FilterOperators,
  QueryConstructor,
} from 'src/shared/collection-query';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class NotificationService extends EntityCrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly repositoryNotification: Repository<Notification>,
  ) {
    super(repositoryNotification);
  }

  async fetchMyNotification(user: any, query: CollectionQuery) {
    query.where.push([
      {
        column: 'employeeId',
        operator: FilterOperators.EqualTo,
        value: user.id,
      },
    ]);

    const dataQuery = QueryConstructor.constructQuery<Notification>(
      this.repositoryNotification,
      query,
    );

    const response = new DataResponseFormat<Notification>();
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
