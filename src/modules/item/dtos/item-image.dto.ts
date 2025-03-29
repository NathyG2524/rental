import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateItemImageDto {
  @IsNotEmpty()
  @IsNumber()
  item_id: number;

  @IsNotEmpty()
  @IsString()
  image_url: string;
}

export class UpdateItemImageDto {
  @IsOptional()
  @IsNumber()
  item_id?: number;

  @IsOptional()
  @IsString()
  image_url?: string;
}
