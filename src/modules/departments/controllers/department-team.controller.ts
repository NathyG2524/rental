import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentTeamService } from '../services/department-team.service';
import { DepartmentTeam } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateDepartmentTeamDto } from '../dtos/department-team.dto';

const options: ExtraCrudOptions = {
  entityIdName: 'departmentId',
  createDto: CreateDepartmentTeamDto,
};

@ApiBearerAuth()
@Controller('department-teams')
@ApiTags('Department Teams')
export class DepartmentTeamController extends ExtraCrudController<DepartmentTeam>(
  options,
) {
  constructor(private readonly departmentTeamService: DepartmentTeamService) {
    super(departmentTeamService);
  }
}
