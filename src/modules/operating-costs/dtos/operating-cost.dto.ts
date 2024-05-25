import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOperatingCostDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  budgetAmount: number;

  @ApiProperty()
  @IsNumber()
  spendingAmount: number;

  @ApiProperty()
  @IsString()
  projectId: string;
}
