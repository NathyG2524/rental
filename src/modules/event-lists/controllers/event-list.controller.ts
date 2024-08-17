import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventListService } from '../services/event-list.service';
import { EventList } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateEventListDto } from '../dtos/event-list.dto';
import { AllowAnonymous } from 'src/shared/authorization';

const options: EntityCrudOptions = {
  createDto: CreateEventListDto,
};

@ApiBearerAuth()
@Controller('event-lists')
@ApiTags('Event Lists')
export class EventListController extends EntityCrudController<EventList>(
  options,
) {
  constructor(private readonly eventListService: EventListService) {
    super(eventListService);
  }

  @Post('bulk-create')
  @AllowAnonymous()
  async bulkCreate(@Body() itemData: CreateEventListDto[]) {
    return this.eventListService.bulkCreate(itemData);
  }
}
