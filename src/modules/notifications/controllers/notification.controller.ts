import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { Notification } from '@entities';
import { EntityCrudOptions } from 'src/shared/types/crud-option.type';
import { EntityCrudController } from 'src/shared/controller';
import { CreateNotificationDto } from '../dtos/notification.dto';
import { decodeCollectionQuery } from 'src/shared/collection-query';
import { CurrentUser } from 'src/shared/authorization';

const options: EntityCrudOptions = {
  createDto: CreateNotificationDto,
};

@ApiBearerAuth()
@Controller('notifications')
@ApiTags('Notifications')
export class NotificationController extends EntityCrudController<Notification>(
  options,
) {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService);
  }

  @Get()
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  async fetchMyNotification(@CurrentUser() user: any, @Query('q') q?: string) {
    const query = decodeCollectionQuery(q);
    return this.notificationService.fetchMyNotification(user, query);
  }
}
