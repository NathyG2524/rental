import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, ProjectTask, DepartmentTeam } from 'src/entities';
import { ProjectTeamController } from './controllers/project-team.controller';
import { DepartmentTeamService } from './services/department-team.service';
import { ProjectTaskController } from './controllers/project-task.controller';
import { ProjectTaskService } from './services/project-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, DepartmentTeam, ProjectTask])],
  controllers: [
    ProjectController,
    ProjectTeamController,
    ProjectTaskController,
  ],
  providers: [ProjectService, DepartmentTeamService, ProjectTaskService],
})
export class ProjectModule {}
