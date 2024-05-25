import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { AccountPayable } from 'src/entities';

@Injectable()
export class AccountPayableService extends EntityCrudService<AccountPayable> {
  constructor(
    @InjectRepository(AccountPayable)
    private readonly repositoryAccountPayable: Repository<AccountPayable>,
  ) {
    super(repositoryAccountPayable);
  }
}
