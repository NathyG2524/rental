import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EmployeeLeaveRequest } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { EmployeeLeaveRequestService } from '../services/employee-leave-request.service';
import {
  CreateEmployeeLeaveRequestDto,
  UpdateEmployeeLeaveRequestStatusDto,
} from '../dtos/employee-leave-request.dto';
import { AllowAnonymous, CurrentUser } from 'src/shared/authorization';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

const options: EntityCrudOptions = {
  createDto: CreateEmployeeLeaveRequestDto,
};

@ApiBearerAuth()
@Controller('employee-leave-requests')
@ApiTags('Employee Leave Requests')
export class EmployeeLeaveRequestController extends EntityCrudController<EmployeeLeaveRequest>(
  options,
) {
  constructor(
    private readonly lEaLeaveTypeService: EmployeeLeaveRequestService,
  ) {
    super(lEaLeaveTypeService);
  }

  @Post('update-status')
  async updateStatus(
    @Body() itemData: UpdateEmployeeLeaveRequestStatusDto,
    @CurrentUser() user: any,
  ) {
    return this.lEaLeaveTypeService.updateStatus(itemData, user);
  }

  @Post('upload-document/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.lEaLeaveTypeService.uploadDocument(id, file);
    return result;
  }

  @Get('download-document/:id')
  @AllowAnonymous()
  async downloadDocument(@Param('id') id: string, @Res() res: Response) {
    const result = await this.lEaLeaveTypeService.downloadDocument(id);

    res.set({
      ...result.response,
    });

    return res.send(result.buffer);
  }

  @Get('remaining-days/:employeeId/:leaveTypeId')
  @AllowAnonymous()
  async remainingDays(
    @Param('leaveTypeId') leaveTypeId: string,
    @Param('employeeId') employeeId: string,
  ) {
    const result = await this.lEaLeaveTypeService.remainingDays(
      employeeId,
      leaveTypeId,
    );
    return result;
  }
}
