import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, ProjectTask, ProjectTeam } from 'src/entities';
import { ProjectTeamController } from './controllers/project-team.controller';
import { ProjectTeamService } from './services/project-team.service';
import { ProjectTaskController } from './controllers/project-task.controller';
import { ProjectTaskService } from './services/project-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectTeam, ProjectTask])],
  controllers: [
    ProjectController,
    ProjectTeamController,
    ProjectTaskController,
  ],
  providers: [ProjectService, ProjectTeamService, ProjectTaskService],
})
export class ProjectModule {}
