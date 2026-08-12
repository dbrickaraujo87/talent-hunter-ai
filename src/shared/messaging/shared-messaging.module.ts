import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ProxyRouterService } from './proxy-router.service';
import {
  RABBITMQ_CONSTANTS,
  RabbitMQQueue,
  DomainEvents,
} from './constants/events.constant';

@Module({
  imports: [
    RabbitMQModule.forRoot({
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
      uri: process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [ProxyRouterService],
  exports: [ProxyRouterService, RabbitMQModule],
})
export class SharedMessagingModule {}
