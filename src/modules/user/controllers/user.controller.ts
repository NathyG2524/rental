import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { User } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import {
  CreateUserDto,
  LoginDto,
  UpdateAccountPermissionDto,
  UpdateUserDetailDto,
  UpdateUserDto,
  UpdateUpdatePasswordDto,
} from '../dtos/user.dto';
import { AllowAnonymous } from 'src/shared/authorization';
import JwtRefreshGuard from 'src/shared/authorization/guards/jwt-refresh.guard';

const options: EntityCrudOptions = {
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
};

@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
export class UserController extends EntityCrudController<User>(
  options,
) {
  constructor(private readonly employeeService: UserService) {
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
  async updateUserDetail(@Body() itemData: UpdateUserDetailDto) {
    return await this.employeeService.updateUserDetail(itemData);
  }

}