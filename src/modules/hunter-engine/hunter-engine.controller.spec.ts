import { Test, TestingModule } from '@nestjs/testing';
import { HunterEngineController } from './hunter-engine.controller';
import { HunterEngineService } from './hunter-engine.service';

describe('HunterEngineController', () => {
  let controller: HunterEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HunterEngineController],
      providers: [HunterEngineService],
    }).compile();

    controller = module.get<HunterEngineController>(HunterEngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
