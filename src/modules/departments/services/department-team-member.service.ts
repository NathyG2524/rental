import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { DepartmentTeamMember } from 'src/entities';

@Injectable()
export class DepartmentTeamMemberService extends ExtraCrudService<DepartmentTeamMember> {
  constructor(
    @InjectRepository(DepartmentTeamMember)
    private readonly repositoryDepartment: Repository<DepartmentTeamMember>,
  ) {
    super(repositoryDepartment);
  }
}
