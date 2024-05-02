import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SocialMediaService } from '../services/social-media.service';
import { SocialMedia } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateSocialMediaDto } from '../dtos/social-media.dto';

const options: EntityCrudOptions = {
  createDto: CreateSocialMediaDto,
};

@ApiBearerAuth()
@Controller('social-medias')
@ApiTags('Social Medias')
export class SocialMediaController extends EntityCrudController<SocialMedia>(
  options,
) {
  constructor(private readonly soSocialMediaService: SocialMediaService) {
    super(soSocialMediaService);
  }
}
