import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSocialMediaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNumber()
  followers: number;

  @ApiProperty()
  @IsNumber()
  posts: number;

  @ApiProperty()
  @IsString()
  managerId: string;
}
