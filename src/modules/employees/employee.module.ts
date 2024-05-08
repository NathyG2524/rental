import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Employee,
  EmployeeAccount,
  EmployeeLeaveAllocation,
  EmployeeLeaveRequest,
  EmployeeTimeSheet,
} from 'src/entities';
import { EmployeeTimeSheetController } from './controllers/employee-time-sheet.controller';
import { EmployeeTimeSheetService } from './services/employee-time-sheet.service';
import { AuthorizationModule } from 'src/shared/authorization';
import { EmployeeLeaveAllocationController } from './controllers/employee-leave-allocation.controller';
import { EmployeeLeaveRequestController } from './controllers/employee-leave-request.controller';
import { EmployeeLeaveAllocationService } from './services/employee-leave-allocation.service';
import { EmployeeLeaveRequestService } from './services/employee-leave-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeAccount,
      EmployeeTimeSheet,
      EmployeeLeaveAllocation,
      EmployeeLeaveRequest,
    ]),
    AuthorizationModule,
  ],
  controllers: [
    EmployeeController,
    EmployeeTimeSheetController,
    EmployeeLeaveAllocationController,
    EmployeeLeaveRequestController,
  ],
  providers: [
    EmployeeService,
    EmployeeTimeSheetService,
    EmployeeLeaveAllocationService,
    EmployeeLeaveRequestService,
  ],
})
export class EmployeeModule {}
