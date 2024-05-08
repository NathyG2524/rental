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
