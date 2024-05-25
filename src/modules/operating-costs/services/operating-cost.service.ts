import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { OperatingCost } from 'src/entities';

@Injectable()
export class OperatingCostService extends EntityCrudService<OperatingCost> {
  constructor(
    @InjectRepository(OperatingCost)
    private readonly repositoryOperatingCost: Repository<OperatingCost>,
  ) {
    super(repositoryOperatingCost);
  }
}
