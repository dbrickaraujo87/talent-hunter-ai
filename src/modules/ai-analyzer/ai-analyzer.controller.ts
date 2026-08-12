import { Controller } from '@nestjs/common';
import { AiAnalyzerService } from './ai-analyzer.service';

@Controller('ai-analyzer')
export class AiAnalyzerController {
  constructor(private readonly aiAnalyzerService: AiAnalyzerService) {}
}
