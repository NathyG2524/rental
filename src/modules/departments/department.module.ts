import { Module } from '@nestjs/common';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department, DepartmentTeam, DepartmentTeamMember } from 'src/entities';
import { DepartmentTeamController } from './controllers/department-team.controller';
import { DepartmentTeamMemberController } from './controllers/department-team-member.controller';
import { DepartmentTeamService } from './services/department-team.service';
import { DepartmentTeamMemberService } from './services/department-team-member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      DepartmentTeam,
      DepartmentTeamMember,
    ]),
  ],
  controllers: [
    DepartmentController,
    DepartmentTeamController,
    DepartmentTeamMemberController,
  ],
  providers: [
    DepartmentService,
    DepartmentTeamService,
    DepartmentTeamMemberService,
  ],
})
export class DepartmentModule {}
