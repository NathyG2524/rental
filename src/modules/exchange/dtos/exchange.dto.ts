import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExchangeDto {
  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  rate: number;
}
