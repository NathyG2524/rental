import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import {
  CreateEmployeeDto,
  LoginDto,
  UpdateAccountPermissionDto,
  UpdateEmployeeDetailDto,
  UpdateEmployeeDto,
  UpdateUpdatePasswordDto,
} from '../dtos/employee.dto';
import { AllowAnonymous } from 'src/shared/authorization';
import JwtRefreshGuard from 'src/shared/authorization/guards/jwt-refresh.guard';
import { FileInterceptor } from '@nestjs/platform-express';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeDto,
  updateDto: UpdateEmployeeDto,
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
  async login(@Body() itemData: LoginDto, @Req() req: Request) {
    return await this.employeeService.login(itemData, req);
  }

  @Post('refresh-token')
  @AllowAnonymous()
  @UseGuards(JwtRefreshGuard)
  refreshToken(@Req() req: Request) {
    return this.employeeService.refreshToken(req);
  }

  @Post('update-password')
  async updatePassword(@Body() itemData: UpdateUpdatePasswordDto) {
    return await this.employeeService.updatePassword(itemData);
  }

  @Post('update-permissions')
  async updateAccountPermission(@Body() itemData: UpdateAccountPermissionDto) {
    return await this.employeeService.updateAccountPermission(itemData);
  }

  @Post('update-detail')
  async updateEmployeeDetail(@Body() itemData: UpdateEmployeeDetailDto) {
    return await this.employeeService.updateEmployeeDetail(itemData);
  }

  @Post('upload-employee-id/id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEmployeeId(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      id,
      fileName: file.originalname,
    };
  }

  @Post('upload-contract-letter/id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadContractLetter(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      id,
      fileName: file.originalname,
    };
  }

  @Post('upload-kebele-id/id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadKebeleId(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      id,
      fileName: file.originalname,
    };
  }
}
