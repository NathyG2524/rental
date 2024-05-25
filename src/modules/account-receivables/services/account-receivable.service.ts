import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { AccountReceivable } from 'src/entities';

@Injectable()
export class AccountReceivableService extends EntityCrudService<AccountReceivable> {
  constructor(
    @InjectRepository(AccountReceivable)
    private readonly repositoryAccountReceivable: Repository<AccountReceivable>,
  ) {
    super(repositoryAccountReceivable);
  }
}
