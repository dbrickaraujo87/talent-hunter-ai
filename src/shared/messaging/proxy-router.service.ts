import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  RABBITMQ_CONSTANTS,
  DomainEvents,
  JobCreatedPayload,
} from './constants/events.constant';

@Injectable()
export class ProxyRouterService {
  private readonly logger = new Logger(ProxyRouterService.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendEvent<T>(routingKey: DomainEvents, payload: T): Promise<void> {
    this.logger.log(`Publishing event: ${routingKey}`);
    await this.amqpConnection.publish(RABBITMQ_CONSTANTS, routingKey, payload);
  }

  async dispatchJobCreated(payload: JobCreatedPayload): Promise<void> {
    await this.sendEvent(DomainEvents.JOB_CREATED, payload);
  }
}
