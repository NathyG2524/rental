import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DepartmentTeamService } from '../services/department-team.service';
import { DepartmentTeam } from '@entities';
import { ExtraCrudOptions } from 'src/shared/types/crud-option.type';
import { ExtraCrudController } from 'src/shared/controller';
import { CreateDepartmentTeamDto } from '../dtos/department-team.dto';
import { decodeCollectionQuery } from 'src/shared/collection-query';
import { AllowAnonymous } from 'src/shared/authorization';

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

  @Get('fetch')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  @AllowAnonymous()
  async fetchAll(@Query('q') q: string) {
    const query = decodeCollectionQuery(q);
    return this.departmentTeamService.fetchAll(query);
  }
}
