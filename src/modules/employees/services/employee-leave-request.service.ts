import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeLeaveRequest } from '@entities';
import {
  CreateEmployeeLeaveRequestDto,
  UpdateEmployeeLeaveRequestStatusDto,
} from '../dtos/employee-leave-request.dto';

@Injectable()
export class EmployeeLeaveRequestService extends EntityCrudService<EmployeeLeaveRequest> {
  constructor(
    @InjectRepository(EmployeeLeaveRequest)
    private readonly repositoryLeaveType: Repository<EmployeeLeaveRequest>,
  ) {
    super(repositoryLeaveType);
  }

  async create(
    itemData: CreateEmployeeLeaveRequestDto,
    req?: any,
  ): Promise<any> {
    if (itemData.effectiveFrom > itemData.effectiveTo) {
      throw new BadRequestException(
        'Effective From cannot be greater than Effective To',
      );
    }

    const item = this.repositoryLeaveType.create(itemData);
    await this.repositoryLeaveType.insert(item);
    return item;
  }

  async updateStatus(itemData: UpdateEmployeeLeaveRequestStatusDto, user: any) {
    const item = await this.findOneOrFail(itemData.id);
    await this.repositoryLeaveType.update(item.id, {
      status: itemData.status,
      reason: itemData.reason,
      approvedById: user.id,
      approvedAt: new Date(),
    });
    return {
      ...item,
      ...itemData,
    };
  }
}
