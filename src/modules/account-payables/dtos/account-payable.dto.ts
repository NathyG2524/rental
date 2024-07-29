import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateAccountPayableDto {
  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;
}
