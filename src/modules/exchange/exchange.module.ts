import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchange } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange])],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
