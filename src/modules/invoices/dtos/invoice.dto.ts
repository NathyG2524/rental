import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  approvedById: string;

  @ApiProperty()
  @IsString()
  checkedById: string;

  @ApiProperty()
  @IsString()
  requestedById: string;

  @ApiProperty()
  @IsString()
  clientId: string;
}
