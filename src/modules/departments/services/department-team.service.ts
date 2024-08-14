import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { DepartmentTeam } from 'src/entities';

@Injectable()
export class DepartmentTeamService extends ExtraCrudService<DepartmentTeam> {
  constructor(
    @InjectRepository(DepartmentTeam)
    private readonly repositoryDepartment: Repository<DepartmentTeam>,
  ) {
    super(repositoryDepartment);
  }
}
