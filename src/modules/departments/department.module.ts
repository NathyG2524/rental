import { Module } from '@nestjs/common';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
