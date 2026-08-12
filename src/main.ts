import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQQueue } from './shared/messaging/constants/events.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Regista a configuração do RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672', // <-- Credenciais corretas aqui
      ],
      queue: RabbitMQQueue.API_GATEWAY, // <-- Nome da fila
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

  // Inicia os microserviços (RabbitMQ)
  await app.startAllMicroservices();

  // Define a porta dinâmica da variável de ambiente ou usa 4000 como fallback local
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

  //IMPORTANTE: Adicionar '0.0.0.0' para expor a interface de rede no container
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
