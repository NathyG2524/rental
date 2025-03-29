import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityCrudService } from 'src/shared/service';


import { randomUUID } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { ENTITY_MANAGER_KEY } from 'src/shared/interceptors';
import { AuthHelper } from 'src/shared/authorization';
import * as SftpClient from 'ssh2-sftp-client';
import { extname } from 'path';
import { CreateUserDto, LoginDto, LoginResponseDto, UpdateAccountPermissionDto, UpdateUpdatePasswordDto, UpdateUserDetailDto } from '../dtos/user.dto';
import { User } from '@entities';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class UserService extends EntityCrudService<User> {
  private sftp: SftpClient;

  private config = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
  };

  constructor(
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
    private readonly authHelper: AuthHelper,
    @Inject(REQUEST) private request: Request,
  ) {
    super(repositoryUser);
    this.sftp = new SftpClient();
  }

  async create(itemData: CreateUserDto, req?: any) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    if (req?.user) {
    }
    const user = this.repositoryUser.create(itemData);

    await manager.getRepository(User).insert(user);

    const password = this.authHelper.encodePassword('12345');

    await manager.getRepository(Account).insert({
      userId: user.id,
      username: user.email.toLocaleLowerCase(),
      password,
    });

    return user;
  }

  async findOne(id: any) {
    return await this.repositoryUser.findOne({
      where: { id },
      relations: { account: true },
      select: {
        account: {
          permissions: true,
        },
      },
    });
  }

  async updateAccountPermission(input: UpdateAccountPermissionDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(Account).findOne({
      where: {
        userId: input.userId,
      },
    });

    await manager.getRepository(Account).update(account.id, {
      permissions: input.permissions,
    });
  }

  async updateUserDetail(input: UpdateUserDetailDto) {
    const item = await this.findOneOrFail(input.userId);

    await this.repositoryUser.update(item.id, {
      details: input.details,
    });

    return {
      ...item,
      ...input,
    };
  }

  async updatePassword(input: UpdateUpdatePasswordDto) {
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(Account).findOne({
      where: {
        userId: input.userId,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const password = this.authHelper.encodePassword(input.password);

    await manager.getRepository(Account).update(account.id, {
      password,
      isPasswordUpdated: true,
    });
  }

  async login(input: LoginDto, req?: any) {
    console.log('🚀 ~ UserService ~ login ~ req:', req);

    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(Account).findOne({
      where: {
        username: input.email.toLocaleLowerCase(),
      },
      relations: {
        user: true,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const isPasswordValid: boolean = this.authHelper.compareHashedValue(
      input.password,
      account.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('something_went_wrong');
    }

    await manager.getRepository(Account).update(account.id, {
      lastLogon: new Date(),
    });

    const token: LoginResponseDto = {
      access_token: this.authHelper.generateAccessToken({
        id: account.userId,
        firstName: account.user.firstName,
        lastName: account.user.lastName,
        email: account.user.email,
        permissions: account.permissions,
      }),
      refresh_token: this.authHelper.generateRefreshToken({
        id: account.id,
      }),
      isPasswordUpdated: account.isPasswordUpdated,
    };

    return token;
  }

  public async refreshToken(req: any): Promise<LoginResponseDto | never> {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('invalid_refresh_token');
    }
    const id = user.id;
    const manager: EntityManager = this.request[ENTITY_MANAGER_KEY];

    const account = await manager.getRepository(Account).findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!account) {
      throw new BadRequestException('something_went_wrong');
    }

    const token: LoginResponseDto = {
      access_token: this.authHelper.generateAccessToken({
        id: account.userId,
        firstName: account.user.firstName,
        lastName: account.user.lastName,
        email: account.user.email,
        permissions: account.permissions,
      }),
    };

    return token;
  }
}
