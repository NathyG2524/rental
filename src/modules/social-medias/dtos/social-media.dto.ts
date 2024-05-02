import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSocialMediaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  managerId: string;
}
