import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Employee, EmployeeAccount } from 'src/entities';
import {
  CreateEmployeeDto,
  LoginDto,
  LoginResponseDto,
  UpdateAccountPermissionDto,
  UpdateEmployeeDetailDto,
  UpdateUpdatePasswordDto,
} from '../dtos/employee.dto';
import { randomInt } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { AuthHelper } from 'src/shared/authorization';

@Injectable()
export class EmployeeService extends EntityCrudService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly repositoryEmployee: Repository<Employee>,
    private readonly authHelper: AuthHelper,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryEmployee);
  }

  async create(itemData: CreateEmployeeDto, req?: any) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    if (req?.user) {
    }
    const employee = this.repositoryEmployee.create(itemData);

    const randomNumber = randomInt(100000, 999999);

    employee.idNo = randomNumber.toString();

    await manager.getRepository(Employee).insert(employee);

    const password = this.authHelper.encodePassword(randomNumber.toString());

    manager.getRepository(EmployeeAccount).create({
      employeeId: employee.id,
      username: employee.email,
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
    });
  }

  async login(input: LoginDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(EmployeeAccount).findOne({
      where: {
        username: input.email,
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

    const token: LoginResponseDto = {
      access_token: this.authHelper.generateAccessToken({
        id: account.employeeId,
        firstName: account.employee.firstName,
        lastName: account.employee.lastName,
        email: account.employee.email,
        permissions: account.permissions,
      }),
      refresh_token: this.authHelper.generateRefreshToken({
        id: account.employeeId,
      }),
    };

    return token;
  }
}
