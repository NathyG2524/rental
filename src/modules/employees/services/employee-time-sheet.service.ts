import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EmployeeTimeSheet } from 'src/entities';

@Injectable()
export class EmployeeTimeSheetService extends EntityCrudService<EmployeeTimeSheet> {
  constructor(
    @InjectRepository(EmployeeTimeSheet)
    private readonly repositoryEmployeeTimeSheet: Repository<EmployeeTimeSheet>,
  ) {
    super(repositoryEmployeeTimeSheet);
  }
}
