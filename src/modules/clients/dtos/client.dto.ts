import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  secondaryEmail: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  secondaryPhone: string[];

  @ApiProperty()
  @IsString()
  createdById: string;
}

export class UpdateClientAdditionalInfoDto {
  @ApiProperty()
  @IsObject()
  additionalInfo: any;
}
