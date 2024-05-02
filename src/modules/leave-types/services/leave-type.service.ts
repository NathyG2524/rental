import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { LeaveType } from 'src/entities';

@Injectable()
export class LeaveTypeService extends EntityCrudService<LeaveType> {
  constructor(
    @InjectRepository(LeaveType)
    private readonly repositoryLeaveType: Repository<LeaveType>,
  ) {
    super(repositoryLeaveType);
  }
}
