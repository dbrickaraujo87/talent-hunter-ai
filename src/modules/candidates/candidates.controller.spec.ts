import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        CandidatesService,
        {
          provide: Repository,
          useValue: { create: jest.fn(), save: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
