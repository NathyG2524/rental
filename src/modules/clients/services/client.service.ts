import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Client } from 'src/entities';

@Injectable()
export class ClientService extends EntityCrudService<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly repositoryClient: Repository<Client>,
  ) {
    super(repositoryClient);
  }
}
