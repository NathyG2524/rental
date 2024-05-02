import { Module } from '@nestjs/common';
import { LeaveTypeController } from './controllers/leave-type.controller';
import { LeaveTypeService } from './services/leave-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveType])],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService],
})
export class LeaveTypeModule {}
