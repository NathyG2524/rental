import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice, InvoiceItem } from 'src/entities';
import { InvoiceItemController } from './controllers/invoice.controller copy';
import { InvoiceItemService } from './services/invoice-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem])],
  controllers: [InvoiceController, InvoiceItemController],
  providers: [InvoiceService, InvoiceItemService],
})
export class InvoiceModule {}
