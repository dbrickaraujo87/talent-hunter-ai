import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { ProxyRouterService } from './proxy-router.service';
import {
  RABBITMQ_CONSTANTS,
  RabbitMQQueue,
  DomainEvents,
} from './constants/events.constant';

@Module({
  imports: [
    //essa configuração serve para criar a conexão com o RabbitMQ e definir as filas e exchanges que serão usadas na aplicação
    //utilizar forRootAsync para poder injetar o ConfigService e pegar a URL do RabbitMQ do .env
    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('RABBITMQ_URL') ||
          'amqp://admin:admin123@localhost:5672',
        connectionInitOptions: { wait: false },
        exchanges: [
          {
            name: RABBITMQ_CONSTANTS,
            type: 'topic',
            createExchangeIfNotExists: true,
          },
        ],
        queues: [
          {
            name: RabbitMQQueue.HUNTER_ENGINE,
            createQueueIfNotExists: true,
            options: { durable: true },
            exchange: RABBITMQ_CONSTANTS,
            routingKey: DomainEvents.JOB_ANALYZED,
          },
          {
            name: RabbitMQQueue.AI_JOB_ANALYZER,
            createQueueIfNotExists: true,
            options: { durable: true },
            exchange: RABBITMQ_CONSTANTS,
            routingKey: DomainEvents.JOB_CREATED,
          },
          {
            name: RabbitMQQueue.PROFILE_ENRICHER,
            createQueueIfNotExists: true,
            options: { durable: true },
            exchange: RABBITMQ_CONSTANTS,
            routingKey: DomainEvents.CANDIDATE_RAW_FOUND,
          },
          {
            name: RabbitMQQueue.MATCHING,
            createQueueIfNotExists: true,
            options: { durable: true },
            exchange: RABBITMQ_CONSTANTS,
            routingKey: DomainEvents.CANDIDATE_CONSOLIDATED,
          },
          {
            name: RabbitMQQueue.OUTREACH,
            createQueueIfNotExists: true,
            options: { durable: true },
            exchange: RABBITMQ_CONSTANTS,
            routingKey: DomainEvents.MATCHING_COMPLETED,
          },
        ],
      }),
    }),
  ],
  providers: [ProxyRouterService],
  exports: [ProxyRouterService, RabbitMQModule],
})
export class SharedMessagingModule {}
