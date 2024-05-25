import { Module } from '@nestjs/common';
import { OperatingCostController } from './controllers/operating-cost.controller';
import { OperatingCostService } from './services/operating-cost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingCost, OperatingCostDetail } from 'src/entities';
import { OperatingCostDetailController } from './controllers/operating-cost-detail.controller';
import { OperatingCostDetailService } from './services/operating-cost-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperatingCost, OperatingCostDetail])],
  controllers: [OperatingCostController, OperatingCostDetailController],
  providers: [OperatingCostService, OperatingCostDetailService],
})
export class OperatingCostModule {}
