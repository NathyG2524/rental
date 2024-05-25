import { Module } from '@nestjs/common';
import { AccountReceivableController } from './controllers/account-receivable.controller';
import { AccountReceivableService } from './services/account-receivable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountReceivable, AccountReceivableDetail } from 'src/entities';
import { AccountReceivableDetailController } from './controllers/account-receivable-detail.controller';
import { AccountReceivableDetailService } from './services/account-receivable-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountReceivable, AccountReceivableDetail]),
  ],
  controllers: [AccountReceivableController, AccountReceivableDetailController],
  providers: [AccountReceivableService, AccountReceivableDetailService],
})
export class AccountReceivableModule {}
