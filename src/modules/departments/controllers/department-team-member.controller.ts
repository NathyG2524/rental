import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentTeamMemberService } from '../services/department-team-member.service';
import { DepartmentTeamMember } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateDepartmentTeamMemberDto } from '../dtos/department-team-member.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'departmentTeamMemberId',
  createDto: CreateDepartmentTeamMemberDto,
};

@ApiBearerAuth()
@Controller('department-team-members')
@ApiTags('Department Team Members')
export class DepartmentTeamMemberController extends ExtraCrudController<DepartmentTeamMember>(
  options,
) {
  constructor(
    private readonly departmentTeamMemberService: DepartmentTeamMemberService,
  ) {
    super(departmentTeamMemberService);
  }
}
