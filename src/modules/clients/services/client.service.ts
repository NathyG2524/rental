import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Client } from 'src/entities';
import { UpdateClientAdditionalInfoDto } from '../dtos/client.dto';

@Injectable()
export class ClientService extends EntityCrudService<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly repositoryClient: Repository<Client>,
  ) {
    super(repositoryClient);
  }

  async updateAdditionalInfo(
    id: string,
    itemData: UpdateClientAdditionalInfoDto,
  ) {
    const item = await this.findOneOrFail(id);

    await this.repositoryClient.update(item.id, {
      additionalInfo: itemData.additionalInfo,
    });

    return {
      ...item,
      ...itemData,
    };
  }
}
