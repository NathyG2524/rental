import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { InvoiceItem } from 'src/entities';

@Injectable()
export class InvoiceItemService extends ExtraCrudService<InvoiceItem> {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly repositoryInvoice: Repository<InvoiceItem>,
  ) {
    super(repositoryInvoice);
  }

  async fetchItems(id: any) {
    const result = await this.repositoryInvoice
      .createQueryBuilder('invoiceItem')
      .leftJoinAndSelect('invoiceItem.project', 'project')
      .where('invoiceItem.invoiceId = :id', { id })
      .getMany();

    return result;
  }

  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
