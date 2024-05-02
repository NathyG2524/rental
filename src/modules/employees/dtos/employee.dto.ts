import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsEmail()
  email: string;

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
  departmentId: string;
}

export class UpdateAccountPermissionDto {
  @ApiProperty()
  @IsEmail()
  employeeId: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
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
}
