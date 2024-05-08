import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import {
  CreateVendorDto,
  UpdateVendorAdditionalInfoDto,
} from '../dtos/vendor.dto';

const options: EntityCrudOptions = {
  createDto: CreateVendorDto,
};

@ApiBearerAuth()
@Controller('vendors')
@ApiTags('Vendors')
export class VendorController extends EntityCrudController<Vendor>(options) {
  constructor(private readonly vendorService: VendorService) {
    super(vendorService);
  }

  @Patch('update-additional-info/:id')
  async updateAdditionalInfo(
    @Param('id') id: string,
    @Body() itemData: UpdateVendorAdditionalInfoDto,
  ) {
    return this.vendorService.updateAdditionalInfo(id, itemData);
  }
}
