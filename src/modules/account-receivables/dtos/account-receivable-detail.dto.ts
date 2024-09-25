import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateAccountReceivableDetailDto {
  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  paid: number;

  @ApiProperty()
  @IsString()
  accountReceivableId: string;
}
