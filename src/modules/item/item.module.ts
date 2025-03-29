import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item, ItemImage } from 'src/entities';
import { AuthorizationModule } from 'src/shared/authorization';
import { ItemController } from './controllers/item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemImage]), AuthorizationModule],
  controllers: [ItemController, ItemImage],
  providers: [ItemService],
})
export class ItemModule {}
