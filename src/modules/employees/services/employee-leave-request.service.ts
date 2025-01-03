import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import {
  EmployeeLeaveAllocation,
  EmployeeLeaveRequest,
  LeaveType,
} from '@entities';
import {
  CreateEmployeeLeaveRequestDto,
  UpdateEmployeeLeaveRequestStatusDto,
} from '../dtos/employee-leave-request.dto';
import * as SftpClient from 'ssh2-sftp-client';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';

@Injectable()
export class EmployeeLeaveRequestService extends EntityCrudService<EmployeeLeaveRequest> {
  private sftp: SftpClient;

  private config = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
  };

  constructor(
    @InjectRepository(EmployeeLeaveRequest)
    private readonly repositoryEmployeeLeaveType: Repository<EmployeeLeaveRequest>,

    @Inject(REQUEST)
    private readonly request: Request,
  ) {
    super(repositoryEmployeeLeaveType);
    this.sftp = new SftpClient();
  }

  async create(itemData: CreateEmployeeLeaveRequestDto): Promise<any> {
    if (itemData.effectiveFrom > itemData.effectiveTo) {
      throw new BadRequestException(
        'Effective From cannot be greater than Effective To',
      );
    }

    itemData.numberOfDays =
      Math.ceil(
        itemData.effectiveTo.getTime() - itemData.effectiveFrom.getTime(),
      ) /
      (1000 * 60 * 60 * 24);

    const item = this.repositoryEmployeeLeaveType.create(itemData);
    await this.repositoryEmployeeLeaveType.insert(item);
    return item;
  }

  async updateStatus(itemData: UpdateEmployeeLeaveRequestStatusDto, user: any) {
    const item = await this.findOneOrFail(itemData.id);
    await this.repositoryEmployeeLeaveType.update(item.id, {
      status: itemData.status,
      reason: itemData.reason,
      approvedById: user.id,
      approvedAt: new Date(),
    });
    //TODO: calculate Remaining leave days for employee
    return {
      ...item,
      ...itemData,
    };
  }

  async uploadDocument(id: string, file: Express.Multer.File) {
    const employee = await this.repositoryEmployeeLeaveType.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    }
    const fileResult = await this.uploadFile(file);

    await this.repositoryEmployeeLeaveType.update(id, {
      document: fileResult as any,
    });

    return fileResult;
  }
  async downloadDocument(id: string) {
    const employee = await this.repositoryEmployeeLeaveType.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    } else if (!employee.document) {
      throw new BadRequestException('kebele_id_photo_not_found');
    }

    return this.downloadFile(employee.document);
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      await this.sftp.connect(this.config);

      const remoteFilePath = process.env.SFTP_PATH;

      const folderExists = await this.sftp.exists(remoteFilePath);

      if (!folderExists) {
        await this.sftp.mkdir(remoteFilePath);
      }

      const remotePath = `${remoteFilePath}${randomUUID()}${extname(file.originalname)}`;

      await this.sftp.put(file.buffer, remotePath);

      return {
        path: remotePath,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    } catch (error) {
      throw error;
    } finally {
      this.sftp.end();
    }
  }

  async downloadFile(fileInfo: any) {
    await this.sftp.connect(this.config as any);
    const buffer = await this.sftp.get(fileInfo.path);

    return {
      buffer,
      response: {
        'Content-Type': `${fileInfo.mimetype}`,
        'Content-Disposition': `attachment; filename="${fileInfo.originalname}"`,
        'Content-Length': fileInfo.size,
      },
    };
  }

  async remainingDays(employeeId: string, leaveTypeId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];
    const employeeLeaveRequest = await this.repositoryEmployeeLeaveType.find({
      where: { employeeId, leaveTypeId, status: 'APPROVED' },
    });

    const leaveAllocation = await manager.getRepository(LeaveType).findOneBy({
      id: leaveTypeId,
    });

    const totalLeaveDays = employeeLeaveRequest.reduce((acc, curr) => {
      return acc + curr.numberOfDays;
    }, 0);

    return leaveAllocation.maxAllowedDate - totalLeaveDays;
  }
}
