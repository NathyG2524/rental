import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, ProjectTask } from 'src/entities';
import { ProjectTaskController } from './controllers/project-task.controller';
import { ProjectTaskService } from './services/project-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectTask])],
  controllers: [ProjectController, ProjectTaskController],
  providers: [ProjectService, ProjectTaskService],
})
export class ProjectModule {}
