import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        url: configService.get<string>('DB_URL'),
        autoLoadEntities: true,
        // Sincroniza o esquema do banco de dados automaticamente em desenvolvimento
        synchronize: isDevelopment,
        // Executa as migrations automaticamente em produção
        migrationsRun: !isDevelopment,
        // Habilita o log de consultas em desenvolvimento
        logging: isDevelopment,
      }),
    }),
  ],
  // Exporta o TypeOrmModule para que outros módulos possam usar a conexão com o banco de dados
  exports: [TypeOrmModule],
})
export class SharedDataBaseModule {}
