import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Department } from 'src/entities';

@Injectable()
export class DepartmentService extends EntityCrudService<Department> {
  constructor(
    @InjectRepository(Department)
    private readonly repositoryDepartment: Repository<Department>,
  ) {
    super(repositoryDepartment);
  }
}
