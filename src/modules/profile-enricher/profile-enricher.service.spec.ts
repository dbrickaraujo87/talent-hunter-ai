import { Test, TestingModule } from '@nestjs/testing';
import { ProfileEnricherService } from './profile-enricher.service';

describe('ProfileEnricherService', () => {
  let service: ProfileEnricherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileEnricherService],
    }).compile();

    service = module.get<ProfileEnricherService>(ProfileEnricherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
