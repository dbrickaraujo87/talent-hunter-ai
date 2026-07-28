//O Serviço Proxy-Router que encaminha tudo
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DomainEvents, JobCreatedPayload } from './constants/events.constant';

@Injectable()
export class ProxyRouterService {
  private readonly logger: Logger = new Logger('ProxyRouterService');

  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async sendEvent<T>(pattern: DomainEvents, payload: T): Promise<void> {
    const envelope = {
      timestamp: new Date().toISOString(),
      event: pattern,
      data: payload,
    };
    this.logger.log(
      `Sending message to pattern: ${pattern} with payload: ${JSON.stringify(payload)}`,
    );
    await firstValueFrom(this.client.emit(pattern, envelope));
  }
  async dispatchJobCreated(payload: JobCreatedPayload): Promise<void> {
    await this.sendEvent(DomainEvents.JOB_CREATED, payload);
  }
}
