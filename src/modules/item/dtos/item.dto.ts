import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  item_name: string;

  @IsString()
  item_type: string;

  @IsString()
  description: string;

  @IsNumber()
  price_per_day: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  item_name?: string;

  @IsString()
  @IsOptional()
  item_type?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price_per_day?: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}
