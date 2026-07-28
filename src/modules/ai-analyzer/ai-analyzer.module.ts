import { Module } from '@nestjs/common';
import { AiAnalyzerService } from './ai-analyzer.service';
import { AiAnalyzerController } from './ai-analyzer.controller';

@Module({
  controllers: [AiAnalyzerController],
  providers: [AiAnalyzerService],
})
export class AiAnalyzerModule {}
