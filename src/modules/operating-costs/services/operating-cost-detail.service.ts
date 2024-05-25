import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { OperatingCostDetail } from 'src/entities';

@Injectable()
export class OperatingCostDetailService extends ExtraCrudService<OperatingCostDetail> {
  constructor(
    @InjectRepository(OperatingCostDetail)
    private readonly repositoryInvoice: Repository<OperatingCostDetail>,
  ) {
    super(repositoryInvoice);
  }
}
