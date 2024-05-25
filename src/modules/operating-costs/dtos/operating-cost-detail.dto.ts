import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOperatingCostDetailDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsString()
  operatingCostId: string;
}
