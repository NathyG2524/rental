import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from '../services/department.service';
import { Department } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateDepartmentDto } from '../dtos/department.dto';

const options: EntityCrudOptions = {
  createDto: CreateDepartmentDto,
};

@ApiBearerAuth()
@Controller('departments')
@ApiTags('Departments')
export class DepartmentController extends EntityCrudController<Department>(
  options,
) {
  constructor(private readonly departmentService: DepartmentService) {
    super(departmentService);
  }
}
