import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ItemImage } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { ItemImageService } from '../services/item-image.service';

const options: EntityCrudOptions = {
  createDto: CreateItemDto,
  updateDto: UpdateItemDto,
};

@ApiBearerAuth()
@Controller('item-images')
@ApiTags('item-images')
export class ItemController extends EntityCrudController<ItemImage>(options) {
  constructor(private readonly itemImageService: ItemImageService) {
    super(itemImageService);
  }

}
