import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OutreachModule } from './modules/outreach/outreach.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AiAnalyzerModule } from './modules/ai-analyzer/ai-analyzer.module';
import { ProfileEnricherModule } from './modules/profile-enricher/profile-enricher.module';
import { MatchingModule } from './modules/matching/matching.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { HunterEngineModule } from './modules/hunter-engine/hunter-engine.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedDataBaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // isGlobal: tru. carrega o .env para toda a aplicação
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    AiAnalyzerModule,
    AuthModule,
    CandidatesModule,
    CompaniesModule,
    HunterEngineModule,
    JobsModule,
    MatchingModule,
    OutreachModule,
    ProfileEnricherModule,
    SharedDataBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
