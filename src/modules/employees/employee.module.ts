import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeAccount, EmployeeTimeSheet } from 'src/entities';
import { EmployeeTimeSheetController } from './controllers/employee-time-sheet.controller';
import { EmployeeTimeSheetService } from './services/employee-time-sheet.service';
import { AuthorizationModule } from 'src/shared/authorization';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, EmployeeAccount, EmployeeTimeSheet]),
    AuthorizationModule,
  ],
  controllers: [EmployeeController, EmployeeTimeSheetController],
  providers: [EmployeeService, EmployeeTimeSheetService],
})
export class EmployeeModule {}
