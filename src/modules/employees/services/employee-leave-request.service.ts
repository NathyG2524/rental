import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeLeaveRequest } from '@entities';
import { UpdateEmployeeLeaveRequestStatusDto } from '../dtos/employee-leave-request.dto';

@Injectable()
export class EmployeeLeaveRequestService extends EntityCrudService<EmployeeLeaveRequest> {
  constructor(
    @InjectRepository(EmployeeLeaveRequest)
    private readonly repositoryLeaveType: Repository<EmployeeLeaveRequest>,
  ) {
    super(repositoryLeaveType);
  }

  async updateStatus(itemData: UpdateEmployeeLeaveRequestStatusDto, user: any) {
    const item = await this.findOneOrFail(itemData.id);
    await this.repositoryLeaveType.update(item.id, {
      status: itemData.status,
      reason: itemData.reason,
      approvedById: user.id,
    });
    return {
      ...item,
      ...itemData,
    };
  }
}
