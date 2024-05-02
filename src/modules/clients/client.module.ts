import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
