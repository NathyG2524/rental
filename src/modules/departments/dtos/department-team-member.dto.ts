import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartmentTeamMemberDto {
  @ApiProperty()
  @IsString()
  employeeId: string;

  @ApiProperty()
  @IsString()
  departmentTeamId: string;
}
