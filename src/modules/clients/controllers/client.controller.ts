import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { Client } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import {
  CreateClientDto,
  UpdateClientAdditionalInfoDto,
} from '../dtos/client.dto';

const options: EntityCrudOptions = {
  createDto: CreateClientDto,
};

@ApiBearerAuth()
@Controller('clients')
@ApiTags('Clients')
export class ClientController extends EntityCrudController<Client>(options) {
  constructor(private readonly clientService: ClientService) {
    super(clientService);
  }

  @Patch('update-additional-info/:id')
  async updateAdditionalInfo(
    @Param('id') id: string,
    @Body() itemData: UpdateClientAdditionalInfoDto,
  ) {
    return this.clientService.updateAdditionalInfo(id, itemData);
  }
}
