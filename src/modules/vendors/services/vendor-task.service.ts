import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ExtraCrudService } from 'src/shared/service';
import { VendorTask } from '@entities';

@Injectable()
export class VendorTaskService extends ExtraCrudService<VendorTask> {
  constructor(
    @InjectRepository(VendorTask)
    private readonly repositoryVendor: Repository<VendorTask>,
  ) {
    super(repositoryVendor);
  }
}
