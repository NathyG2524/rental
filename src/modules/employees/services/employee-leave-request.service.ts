import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeLeaveRequest } from '@entities';
import {
  CreateEmployeeLeaveRequestDto,
  UpdateEmployeeLeaveRequestStatusDto,
} from '../dtos/employee-leave-request.dto';
import * as SftpClient from 'ssh2-sftp-client';
import { extname } from 'path';
import { randomUUID } from 'crypto';

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
    private readonly repositoryLeaveType: Repository<EmployeeLeaveRequest>,
  ) {
    super(repositoryLeaveType);
    this.sftp = new SftpClient();
  }

  async create(itemData: CreateEmployeeLeaveRequestDto): Promise<any> {
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

  async uploadDocument(id: string, file: Express.Multer.File) {
    const employee = await this.repositoryLeaveType.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    }
    const fileResult = await this.uploadFile(file);

    await this.repositoryLeaveType.update(id, {
      document: fileResult as any,
    });

    return fileResult;
  }
  async downloadDocument(id: string) {
    const employee = await this.repositoryLeaveType.findOneBy({ id });
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
}
