import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateLeaveTypeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  maxAllowedDate: number;

  @ApiProperty()
  @IsBoolean()
  isPayment: boolean;

  @ApiProperty()
  @IsBoolean()
  isOptional: boolean;

  @ApiProperty()
  @IsBoolean()
  includesHolidays: boolean;
}
