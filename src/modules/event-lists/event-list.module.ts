import { Module } from '@nestjs/common';
import { EventListController } from './controllers/event-list.controller';
import { EventListService } from './services/event-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventList } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([EventList])],
  controllers: [EventListController],
  providers: [EventListService],
})
export class EventListModule {}
