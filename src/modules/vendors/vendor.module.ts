import { Module } from '@nestjs/common';
import { VendorController } from './controllers/vendor.controller';
import { VendorService } from './services/vendor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor, VendorTask } from 'src/entities';
import { VendorTaskController } from './controllers/vendor-task.controller';
import { VendorTaskService } from './services/vendor-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, VendorTask])],
  controllers: [VendorController, VendorTaskController],
  providers: [VendorService, VendorTaskService],
})
export class VendorModule {}
