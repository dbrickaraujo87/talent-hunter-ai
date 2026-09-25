import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';

const mockCreateJobDto: CreateJobDto = {
  title: 'Software Engineer',
  description: 'Build cool things',
  salary: 10000,
  location: 'Remote',
  seniority: 'Senior',
  requiredSkills: ['TypeScript', 'NestJS'],
  companyId: 'company-1',
};

describe('JobsController', () => {
  let controller: JobsController;
  let jobsService: jest.Mocked<JobsService>;

  const mockJobsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [{ provide: JobsService, useValue: mockJobsService }],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    jobsService = module.get(JobsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate to jobsService.create and return the result', async () => {
      jobsService.create.mockResolvedValue({} as Job);

      await controller.create(mockCreateJobDto);

      expect(jobsService.create).toHaveBeenCalledWith(mockCreateJobDto);
    });

    it('should delegate a falsy DTO to the service for validation', () => {
      controller.create(null as any);

      expect(jobsService.create).toHaveBeenCalledWith(null);
    });

    it('should propagate errors thrown by jobsService.create', async () => {
      jobsService.create.mockRejectedValue(new Error('Service error'));

      await expect(controller.create(mockCreateJobDto)).rejects.toThrow(
        'Service error',
      );
    });
  });
});
