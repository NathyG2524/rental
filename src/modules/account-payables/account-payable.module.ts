import { Module } from '@nestjs/common';
import { AccountPayableController } from './controllers/account-payable.controller';
import { AccountPayableService } from './services/account-payable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPayable, AccountPayableDetail } from 'src/entities';
import { AccountPayableDetailController } from './controllers/account-payabale-detail.controller';
import { AccountPayableDetailService } from './services/account-payable-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountPayable, AccountPayableDetail])],
  controllers: [AccountPayableController, AccountPayableDetailController],
  providers: [AccountPayableService, AccountPayableDetailService],
})
export class AccountPayableModule {}
