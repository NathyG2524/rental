import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Vendor } from '@entities';
import { UpdateVendorAdditionalInfoDto } from '../dtos/vendor.dto';

@Injectable()
export class VendorService extends EntityCrudService<Vendor> {
  constructor(
    @InjectRepository(Vendor)
    private readonly repositoryVendor: Repository<Vendor>,
  ) {
    super(repositoryVendor);
  }

  async updateAdditionalInfo(
    id: string,
    itemData: UpdateVendorAdditionalInfoDto,
  ) {
    const item = await this.findOneOrFail(id);

    await this.repositoryVendor.update(item.id, {
      additionalInfo: itemData.additionalInfo,
    });

    return {
      ...item,
      ...itemData,
    };
  }
}
