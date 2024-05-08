import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeLeaveRequest } from '@entities';

@Injectable()
export class EmployeeLeaveRequestService extends EntityCrudService<EmployeeLeaveRequest> {
  constructor(
    @InjectRepository(EmployeeLeaveRequest)
    private readonly repositoryLeaveType: Repository<EmployeeLeaveRequest>,
  ) {
    super(repositoryLeaveType);
  }
}
