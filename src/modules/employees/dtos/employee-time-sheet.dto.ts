import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateEmployeeTimeSheetDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;
}
