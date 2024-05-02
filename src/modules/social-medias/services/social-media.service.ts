import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { SocialMedia } from 'src/entities';

@Injectable()
export class SocialMediaService extends EntityCrudService<SocialMedia> {
  constructor(
    @InjectRepository(SocialMedia)
    private readonly repositorySocialMedia: Repository<SocialMedia>,
  ) {
    super(repositorySocialMedia);
  }
}
