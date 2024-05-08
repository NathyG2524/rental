import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeLeaveAllocation } from '@entities';

@Injectable()
export class EmployeeLeaveAllocationService extends EntityCrudService<EmployeeLeaveAllocation> {
  constructor(
    @InjectRepository(EmployeeLeaveAllocation)
    private readonly repositoryLeaveType: Repository<EmployeeLeaveAllocation>,
  ) {
    super(repositoryLeaveType);
  }
}
