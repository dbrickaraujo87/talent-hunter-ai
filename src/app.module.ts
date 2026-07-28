import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OutreachController } from './outreach/outreach.controller';
import { OutreachModule } from './outreach/outreach.module';
import { CompaniesModule } from './companies/companies.module';
import { AiAnalyzerModule } from './modules/ai-analyzer/ai-analyzer.module';
import { IaAnalyzerModule } from './modules/ia-analyzer/ia-analyzer.module';
import { ProfileEnricherModule } from './modules/profile-enricher/profile-enricher.module';
import { OutreachModule } from './modules/outreach/outreach.module';
import { MatchingModule } from './modules/matching/matching.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { HunterEngineModule } from './modules/hunter-engine/hunter-engine.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CompaniesModule } from './module/companies/companies.module';
import { CompaniesModule } from './companies/companies.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // isGlobal: tru. carrega o .env para toda a aplicação
    }),
    OutreachModule,
    CompaniesModule,
    AuthModule,
    CandidatesModule,
    HunterEngineModule,
    JobsModule,
    MatchingModule,
    ProfileEnricherModule,
    IaAnalyzerModule,
    AiAnalyzerModule,
  ],
  controllers: [AppController, OutreachController],
  providers: [AppService],
})
export class AppModule {}
