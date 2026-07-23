import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Regista a configuração do RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672', // <-- Credenciais corretas aqui
      ],
      queue: 'cats_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  //Configuração swagger
  const config = new DocumentBuilder()
    .setTitle('Talent Hunter API')
    .setDescription('API documentation for Talent Hunter')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('talent-api', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
