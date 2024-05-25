import { Module } from '@nestjs/common';
import { QuotationController } from './controllers/quotation.controller';
import { QuotationService } from './services/quotation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation, QuotationItem } from 'src/entities';
import { QuotationItemController } from './controllers/quotation.controller copy';
import { QuotationItemService } from './services/quotation-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, QuotationItem])],
  controllers: [QuotationController, QuotationItemController],
  providers: [QuotationService, QuotationItemService],
})
export class QuotationModule {}
