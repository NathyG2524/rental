import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeLeaveRequestDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsUUID()
  leaveTypeId: string;

  @ApiProperty()
  @IsDateString()
  effectiveFrom: Date;

  @ApiProperty()
  @IsDateString()
  effectiveTo: Date;

  @ApiProperty()
  @IsString()
  reason: string;
}
