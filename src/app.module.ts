import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OutreachController } from './outreach/outreach.controller';
import { OutreachModule } from './outreach/outreach.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // isGlobal: tru. carrega o .env para toda a aplicação
    }),
    OutreachModule,
  ],
  controllers: [AppController, OutreachController],
  providers: [AppService],
})
export class AppModule {}
