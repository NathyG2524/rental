import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';
import { EventList } from 'src/entities';

@Injectable()
export class EventListService extends EntityCrudService<EventList> {
  constructor(
    @InjectRepository(EventList)
    private readonly repositoryLeaveType: Repository<EventList>,
  ) {
    super(repositoryLeaveType);
  }
}
