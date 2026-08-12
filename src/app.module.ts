import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
  providers: [AppService],
})
export class AppModule {}
