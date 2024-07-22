import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsString()
  clientId: string;

  @ApiProperty()
  @IsString()
  quotationId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departmentTeamId: string;
}
