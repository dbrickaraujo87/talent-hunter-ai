import { Test, TestingModule } from '@nestjs/testing';
import { HunterEngineService } from './hunter-engine.service';

describe('HunterEngineService', () => {
  let service: HunterEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HunterEngineService],
    }).compile();

    service = module.get<HunterEngineService>(HunterEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
