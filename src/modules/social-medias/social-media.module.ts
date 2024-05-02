import { Module } from '@nestjs/common';
import { SocialMediaController } from './controllers/social-media.controller';
import { SocialMediaService } from './services/social-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
