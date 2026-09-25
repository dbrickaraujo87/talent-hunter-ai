import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SharedMessagingModule } from '../../shared/messaging/shared-messaging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importa o repositório da entidade User para que possa ser injetado no UsersService
    SharedMessagingModule, // Importa para ter acesso ao ProxyRouterService
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
