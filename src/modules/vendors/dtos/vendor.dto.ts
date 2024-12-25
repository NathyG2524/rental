import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  tin: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  createdById: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;
}

export class UpdateVendorAdditionalInfoDto {
  @ApiProperty()
  @IsObject()
  additionalInfo: any;
}
