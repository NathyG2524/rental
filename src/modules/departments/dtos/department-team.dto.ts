import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartmentTeamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  departmentId: string;
}
