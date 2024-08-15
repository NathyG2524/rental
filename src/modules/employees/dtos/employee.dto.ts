import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEmail()
  phone: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  tin: string;

  @ApiProperty()
  @IsString()
  departmentId: string;

  @ApiProperty()
  @IsString()
  bankAccount: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
}

export class UpdateAccountPermissionDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
}

export class UpdateEmployeeDetailDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsObject()
  details: any;
}

export class UpdateUpdatePasswordDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  public access_token: string;
  @ApiProperty()
  public refresh_token?: string;
  @ApiProperty()
  public isPasswordUpdated?: boolean;
}
