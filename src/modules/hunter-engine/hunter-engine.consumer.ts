import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  RABBITMQ_CONSTANTS,
  DomainEvents,
  RabbitMQQueue,
} from '../../shared/messaging/constants/events.constant';
import { HunterEngineService } from './hunter-engine.service';

@Injectable()
export class HunterEngineConsumer {
  private readonly logger = new Logger(HunterEngineConsumer.name);

  constructor(private readonly hunterEngineService: HunterEngineService) {}

  @RabbitSubscribe({
    exchange: RABBITMQ_CONSTANTS,
    routingKey: DomainEvents.JOB_ANALYZED,
    queue: RabbitMQQueue.HUNTER_ENGINE,
    queueOptions: { durable: true },
  })
  async handleJobAnalyzed(payload: Record<string, unknown>) {
    this.logger.log('Domain event received: JOB_ANALYZED');
    this.logger.log(`Job analyzed, starting hunt: ${payload['jobId']}`);
    // TODO: implementar lógica de busca de candidatos
  }
}
