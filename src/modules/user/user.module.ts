import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Account,
} from 'src/entities';
import { AuthorizationModule } from 'src/shared/authorization';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account]), AuthorizationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
