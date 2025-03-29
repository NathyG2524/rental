import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEmail()
  personalEmail: string;

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

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
}

export class UpdateAccountPermissionDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
}

export class UpdateUserDetailDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsObject()
  details: any;
}

export class UpdateUpdatePasswordDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

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
