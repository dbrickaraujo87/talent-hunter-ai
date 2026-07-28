import amqp, { Channel, ChannelModel } from 'amqplib';

export class RabbitMQService {
  private static instance: RabbitMQService;
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private uri: string;

  constructor() {
    this.uri = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  }

  public static getInstance(): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService();
    }
    return RabbitMQService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(this.uri);
        this.channel = await this.connection.createChannel();

        console.log('RabbitMQ connection established');
      }
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }
}
