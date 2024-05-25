import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { TransactionInterceptor } from './shared/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmployeeModule } from './modules/employees/employee.module';
import { ClientModule } from './modules/clients/client.module';
import { DepartmentModule } from './modules/departments/department.module';
import { ProjectModule } from './modules/projects/project.module';
import { SocialMediaModule } from './modules/social-medias/social-media.module';
import { LeaveTypeModule } from './modules/leave-types/leave-type.module';
import { VendorModule } from './modules/vendors/vendor.module';
import { InvoiceModule } from './modules/invoices/invoice.module';
import { QuotationModule } from './modules/quotations/quotation.module';
import { AccountPayableModule } from './modules/account-payables/account-payable.module';
import { AccountReceivableModule } from './modules/account-receivables/account-receivable.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    EmployeeModule,
    DepartmentModule,
    ClientModule,
    ProjectModule,
    SocialMediaModule,
    LeaveTypeModule,
    VendorModule,
    InvoiceModule,
    QuotationModule,
    AccountPayableModule,
    AccountReceivableModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ],
})
export class AppModule {}
