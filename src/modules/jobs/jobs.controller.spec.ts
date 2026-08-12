import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      jobsService.create.mockResolvedValue(undefined);

      await controller.create(mockCreateJobDto);

      expect(jobsService.create).toHaveBeenCalledWith(mockCreateJobDto);
    });

    it('should throw an error when createJobDto is falsy', () => {
      expect(() => controller.create(null as any)).toThrow(
        'createJobDto is required',
      );
      expect(jobsService.create).not.toHaveBeenCalled();
    });

    it('should propagate errors thrown by jobsService.create', async () => {
      jobsService.create.mockRejectedValue(new Error('Service error'));

      await expect(controller.create(mockCreateJobDto)).rejects.toThrow(
        'Service error',
      );
    });
  });

  describe('findAll', () => {
    it('should delegate to jobsService.findAll and return the result', () => {
      const expected = 'This action returns all jobs';
      jobsService.findAll.mockReturnValue(expected);

      const result = controller.findAll();

      expect(jobsService.findAll).toHaveBeenCalled();
      expect(result).toBe(expected);
    });
  });

  describe('findOne', () => {
    it('should delegate to jobsService.findOne with numeric id', () => {
      const expected = 'This action returns a #1 job';
      jobsService.findOne.mockReturnValue(expected);

      const result = controller.findOne('1');

      expect(jobsService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });

  describe('update', () => {
    it('should delegate to jobsService.update with numeric id and dto', () => {
      const updateDto: UpdateJobDto = { title: 'Updated Title' };
      const expected = 'This action updates a #1 job';
      jobsService.update.mockReturnValue(expected);

      const result = controller.update('1', updateDto);

      expect(jobsService.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toBe(expected);
    });
  });

  describe('remove', () => {
    it('should delegate to jobsService.remove with numeric id', () => {
      const expected = 'This action removes a #1 job';
      jobsService.remove.mockReturnValue(expected);

      const result = controller.remove('1');

      expect(jobsService.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });
});
