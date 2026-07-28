import { Test, TestingModule } from '@nestjs/testing';
import { AiAnalyzerController } from './ai-analyzer.controller';
import { AiAnalyzerService } from './ai-analyzer.service';

describe('AiAnalyzerController', () => {
  let controller: AiAnalyzerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAnalyzerController],
      providers: [AiAnalyzerService],
    }).compile();

    controller = module.get<AiAnalyzerController>(AiAnalyzerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
