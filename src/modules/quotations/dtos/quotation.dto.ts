import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuotationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  validityPeriod: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  quotationApprovedById: string;

  @ApiProperty()
  @IsString()
  quotationCheckedById: string;

  @ApiProperty()
  @IsString()
  requestedById: string;

  @ApiProperty()
  @IsString()
  clientId: string;
}
