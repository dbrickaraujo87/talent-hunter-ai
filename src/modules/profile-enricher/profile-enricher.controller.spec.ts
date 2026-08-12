import { Test, TestingModule } from '@nestjs/testing';
import { ProfileEnricherController } from './profile-enricher.controller';
import { ProfileEnricherService } from './profile-enricher.service';

describe('ProfileEnricherController', () => {
  let controller: ProfileEnricherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileEnricherController],
      providers: [ProfileEnricherService],
    }).compile();

    controller = module.get<ProfileEnricherController>(
      ProfileEnricherController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
