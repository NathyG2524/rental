import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';

import { Item, ItemImage } from '@entities';

@Injectable()
export class ItemImageService extends EntityCrudService<ItemImage> {
  constructor(
    @InjectRepository(Item)
    private readonly repositoryItemImage: Repository<ItemImage>,
  ) {
    super(repositoryItemImage);
  }
}
