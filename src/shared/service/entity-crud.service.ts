import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CollectionQuery, QueryConstructor } from '../collection-query';
import { DataResponseFormat } from '../api-data';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class EntityCrudService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async create(itemData: DeepPartial<any>, req?: any): Promise<any> {
    if (req?.user?.organization) {
      itemData.organizationId = req.user.organization.id;
    }
    const item = this.repository.create(itemData);
    await this.repository.insert(item);
    return item;
  }

  async findAll(query: CollectionQuery) {
    const dataQuery = QueryConstructor.constructQuery<T>(
      this.repository,
      query,
    );

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

  async findOne(id: any): Promise<T | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: string, itemData: any): Promise<T | undefined> {
    const item = await this.findOneOrFail(id);
    await this.repository.update(item.id, itemData);
    return {
      ...item,
      ...itemData,
    };
  }

  async delete(id: string): Promise<void> {
    const item = await this.findOneOrFail(id);
    await this.repository.remove(item);
  }

  async findOneOrFail(id: any): Promise<T> {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException(`not_found`);
    }
    return item;
  }
}
