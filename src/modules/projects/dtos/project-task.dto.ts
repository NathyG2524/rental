import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateProjectTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  assignedEmployeeId: string;

  @ApiProperty()
  @IsString()
  assignedReviewerId: string;

  @ApiProperty()
  @IsString()
  projectTeamId: string;

  @ApiProperty()
  @IsString()
  projectId: string;
}
