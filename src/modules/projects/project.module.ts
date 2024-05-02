import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
