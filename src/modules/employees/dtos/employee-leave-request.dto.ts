import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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

  @ApiProperty()
  @IsString()
  @IsOptional()
  numberOfDays: number;

  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  withNote: boolean;
}

export class UpdateEmployeeLeaveRequestStatusDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  reason: string;
}
