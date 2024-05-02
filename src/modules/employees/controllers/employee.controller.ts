import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import {
  CreateEmployeeDto,
  LoginDto,
  UpdateAccountPermissionDto,
} from '../dtos/employee.dto';
import { AllowAnonymous } from 'src/shared/authorization';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeDto,
};

@ApiBearerAuth()
@Controller('employees')
@ApiTags('Employees')
export class EmployeeController extends EntityCrudController<Employee>(
  options,
) {
  constructor(private readonly employeeService: EmployeeService) {
    super(employeeService);
  }

  @Post('login')
  @AllowAnonymous()
  async login(@Body() itemData: LoginDto) {
    return await this.employeeService.login(itemData);
  }

  @Post('update-permissions')
  async updateAccountPermission(@Body() itemData: UpdateAccountPermissionDto) {
    return await this.employeeService.updateAccountPermission(itemData);
  }
}
