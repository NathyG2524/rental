import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { Exchange } from 'src/entities';

@Injectable()
export class ExchangeService extends EntityCrudService<Exchange> {
  constructor(
    @InjectRepository(Exchange)
    private readonly repositoryExchange: Repository<Exchange>,
  ) {
    super(repositoryExchange);
  }
}
