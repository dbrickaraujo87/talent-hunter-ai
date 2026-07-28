import { Test, TestingModule } from '@nestjs/testing';
import { AiAnalyzerService } from './ai-analyzer.service';

describe('AiAnalyzerService', () => {
  let service: AiAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAnalyzerService],
    }).compile();

    service = module.get<AiAnalyzerService>(AiAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
