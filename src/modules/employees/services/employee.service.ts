import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import {
  Employee,
  EmployeeAccount,
  EmployeeLeaveRequest,
  ProjectTask,
} from 'src/entities';
import {
  CreateEmployeeDto,
  LoginDto,
  LoginResponseDto,
  UpdateAccountPermissionDto,
  UpdateEmployeeDetailDto,
  UpdateUpdatePasswordDto,
} from '../dtos/employee.dto';
import { randomInt, randomUUID } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { AuthHelper } from 'src/shared/authorization';
import * as SftpClient from 'ssh2-sftp-client';
import { extname } from 'path';

@Injectable()
export class EmployeeService extends EntityCrudService<Employee> {
  private sftp: SftpClient;

  private config = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
  };

  constructor(
    @InjectRepository(Employee)
    private readonly repositoryEmployee: Repository<Employee>,
    private readonly authHelper: AuthHelper,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryEmployee);
    this.sftp = new SftpClient();
  }

  async create(itemData: CreateEmployeeDto, req?: any) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    if (req?.user) {
    }
    const employee = this.repositoryEmployee.create(itemData);

    const randomNumber = randomInt(100000, 999999);

    employee.idNo = `EMP-${randomNumber.toString()}`;

    await manager.getRepository(Employee).insert(employee);

    const password = this.authHelper.encodePassword('12345');

    await manager.getRepository(EmployeeAccount).insert({
      employeeId: employee.id,
      username: employee.email.toLocaleLowerCase(),
      password,
    });

    return employee;
  }

  async updateAccountPermission(input: UpdateAccountPermissionDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(EmployeeAccount).findOne({
      where: {
        employeeId: input.employeeId,
      },
    });

    await manager.getRepository(EmployeeAccount).update(account.id, {
      permissions: input.permissions,
    });
  }

  async updateEmployeeDetail(input: UpdateEmployeeDetailDto) {
    const item = await this.findOneOrFail(input.employeeId);

    await this.repositoryEmployee.update(item.id, {
      details: input.details,
    });

    return {
      ...item,
      ...input,
    };
  }

  async updatePassword(input: UpdateUpdatePasswordDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(EmployeeAccount).findOne({
      where: {
        employeeId: input.employeeId,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const password = this.authHelper.encodePassword(input.password);

    await manager.getRepository(EmployeeAccount).update(account.id, {
      password,
      isPasswordUpdated: true,
    });
  }

  async login(input: LoginDto, req?: any) {
    console.log('🚀 ~ EmployeeService ~ login ~ req:', req);

    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(EmployeeAccount).findOne({
      where: {
        username: input.email.toLocaleLowerCase(),
      },
      relations: {
        employee: true,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const isPasswordValid: boolean = this.authHelper.compareHashedValue(
      input.password,
      account.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('something_went_wrong');
    }

    await manager.getRepository(EmployeeAccount).update(account.id, {
      lastLogon: new Date(),
    });

    const token: LoginResponseDto = {
      access_token: this.authHelper.generateAccessToken({
        id: account.employeeId,
        firstName: account.employee.firstName,
        lastName: account.employee.lastName,
        email: account.employee.email,
        permissions: account.permissions,
      }),
      refresh_token: this.authHelper.generateRefreshToken({
        id: account.id,
      }),
      isPasswordUpdated: account.isPasswordUpdated,
    };

    return token;
  }

  public async refreshToken(req: any): Promise<LoginResponseDto | never> {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('invalid_refresh_token');
    }
    const id = user.id;
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(EmployeeAccount).findOne({
      where: {
        id,
      },
      relations: {
        employee: true,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const token: LoginResponseDto = {
      access_token: this.authHelper.generateAccessToken({
        id: account.employeeId,
        firstName: account.employee.firstName,
        lastName: account.employee.lastName,
        email: account.employee.email,
        permissions: account.permissions,
      }),
    };

    return token;
  }

  async uploadEmployeeId(id: string, file: Express.Multer.File) {
    const employee = await this.repositoryEmployee.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    }
    const fileResult = await this.uploadFile(file);

    await this.repositoryEmployee.update(id, {
      employeeIdPhoto: fileResult as any,
    });

    return fileResult;
  }

  async downloadEmployeeId(id: string) {
    const employee = await this.repositoryEmployee.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    } else if (!employee.employeeIdPhoto) {
      throw new BadRequestException('employee_id_not_found');
    }

    return this.downloadFile(employee.employeeIdPhoto);
  }

  async downloadContractLetter(id: string) {
    const employee = await this.repositoryEmployee.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    } else if (!employee.contractLetter) {
      throw new BadRequestException('contract_letter_not_found');
    }

    return this.downloadFile(employee.contractLetter);
  }

  async downloadKebeleId(id: string) {
    const employee = await this.repositoryEmployee.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('employee_not_found');
    } else if (!employee.kebeleIdPhoto) {
      throw new BadRequestException('kebele_id_photo_not_found');
    }

    return this.downloadFile(employee.kebeleIdPhoto);
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

  async basicEmployeeReport(employeeId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [completedTask, employee, remainingLeaveDays] = await Promise.all([
      manager.getRepository(ProjectTask).countBy({
        assignedEmployeeId: employeeId,
        status: 'Done',
      }),
      manager.getRepository(Employee).findOne({
        where: {
          id: employeeId,
        },
        select: {
          details: true,
        },
      }),
      manager.getRepository(EmployeeLeaveRequest).find({
        where: {
          employeeId,
          status: 'APPROVED',
        },
        select: {
          effectiveFrom: true,
          effectiveTo: true,
        },
      }),
    ]);

    return {
      completedTask,
      totalLeaveTaken: remainingLeaveDays.reduce(
        (a, b) =>
          a +
          Math.round(
            (b.effectiveTo.getTime() - b.effectiveFrom.getTime()) /
              (1000 * 3600 * 24),
          ),
        0,
      ),
      netSalary: employee?.details?.netSalary ?? 0,
    };
  }

  async employeeProjectReport(employeeId: string) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const [completedTask, employee, remainingLeaveDays] = await Promise.all([
      manager.getRepository(ProjectTask).countBy({
        assignedEmployeeId: employeeId,
        status: 'Done',
      }),
      manager.getRepository(Employee).findOne({
        where: {
          id: employeeId,
        },
        select: {
          details: true,
        },
      }),
      manager.getRepository(EmployeeLeaveRequest).find({
        where: {
          employeeId,
          status: 'APPROVED',
        },
        select: {
          effectiveFrom: true,
          effectiveTo: true,
        },
      }),
    ]);

    return {
      completedTask,
      totalLeaveTaken: remainingLeaveDays.reduce(
        (a, b) =>
          a +
          Math.round(
            (b.effectiveTo.getTime() - b.effectiveFrom.getTime()) /
              (1000 * 3600 * 24),
          ),
        0,
      ),
      netSalary: employee?.details?.netSalary ?? 0,
    };
  }
}
