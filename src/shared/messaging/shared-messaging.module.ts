//Módulo que exporta o ProxyRouterService
import { ProxyRouterService } from './proxy-router.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQQueue } from './constants/events.constant';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              process.env.RABBITMQ_URL ||
                'amqp://admin:admin123@localhost:5672',
            ],
            queue: RabbitMQQueue.API_GATEWAY,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [ProxyRouterService],
  exports: [ProxyRouterService, ClientsModule], // <-- Exporta o ProxyRouterService e ClientsModule para que possam ser usados em outros módulos
})
export class SharedMessagingModule {}
