import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',

        host: configService.get<string>('MONGO_HOST'),
        port: Number(configService.get<number>('MONGO_PORT')),
        username: configService.get<string>('MONGO_USERNAME'),
        password: configService.get<string>('MONGO_PASSWORD'),
        database: configService.get<string>('MONGO_DB_NAME'),
        authSource: 'admin',
        useUnifiedTopology: true,
        autoLoadEntities: true, //Carrega automaticamente entidades cadastradas nos módulos
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Apenas em dev! Em prod use migrations
      }),
    }),
  ],
  exports: [TypeOrmModule], // Exporta o TypeOrmModule para que outros módulos possam usar a conexão com o banco de dados
})
export class SharedDataBaseModule {}
