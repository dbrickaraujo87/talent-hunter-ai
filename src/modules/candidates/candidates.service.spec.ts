import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CandidatesService } from './candidates.service';
import { Candidate } from './entities/candidate.entity';

describe('CandidatesService', () => {
  let service: CandidatesService;

  const mockCandidateRepository = {
    create: jest.fn(),
    save: jest.fn(),
  } as unknown as Repository<Candidate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: Repository,
          useValue: mockCandidateRepository,
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
