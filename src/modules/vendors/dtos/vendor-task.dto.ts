import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVendorTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  budget: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiProperty()
  @IsString()
  vendorId: string;
}
