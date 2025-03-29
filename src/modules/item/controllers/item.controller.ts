import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Item } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { ItemService } from '../services/item.service';

const options: EntityCrudOptions = {
  createDto: CreateItemDto,
  updateDto: UpdateItemDto,
};

@ApiBearerAuth()
@Controller('items')
@ApiTags('items')
export class ItemController extends EntityCrudController<Item>(options) {
  constructor(private readonly itemService: ItemService) {
    super(itemService);
  }

}
