import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';

import { Item } from '@entities';

@Injectable()
export class ItemService extends EntityCrudService<Item> {
  constructor(
    @InjectRepository(Item)
    private readonly repositoryItem: Repository<Item>,
  ) {
    super(repositoryItem);
  }
}
