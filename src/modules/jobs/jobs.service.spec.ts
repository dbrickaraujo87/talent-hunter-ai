import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { JobsService } from './jobs.service';
import { Job } from './entities/job.entity';
import { ProxyRouterService } from '../../shared/messaging/proxy-router.service';
import { CreateJobDto } from './dto/create-job.dto';

jest.mock('crypto');

const mockCreateJobDto: CreateJobDto = {
  title: 'Software Engineer',
  description: 'Build cool things',
  salary: 10000,
  location: 'Remote',
  seniority: 'Senior',
  requiredSkills: ['TypeScript', 'NestJS'],
  companyId: 'company-1',
};

describe('JobsService', () => {
  let service: JobsService;
  let proxyRouterService: jest.Mocked<ProxyRouterService>;

  const mockJobRepository = {
    create: jest.fn().mockReturnValue({}),
  };

  const mockProxyRouterService = {
    dispatchJobCreated: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: getRepositoryToken(Job), useValue: mockJobRepository },
        { provide: ProxyRouterService, useValue: mockProxyRouterService },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    proxyRouterService = module.get(ProxyRouterService);

    (crypto.randomUUID as jest.Mock).mockReturnValue('fixed-uuid');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should dispatch a job created event with the correct payload', async () => {
      proxyRouterService.dispatchJobCreated.mockResolvedValue(undefined);

      await service.create(mockCreateJobDto);

      expect(proxyRouterService.dispatchJobCreated).toHaveBeenCalledWith({
        jobId: 'fixed-uuid',
        title: mockCreateJobDto.title,
        description: mockCreateJobDto.description,
        companyId: mockCreateJobDto.companyId,
        salary: mockCreateJobDto.salary,
        location: mockCreateJobDto.location,
        seniority: mockCreateJobDto.seniority,
        requiredSkills: mockCreateJobDto.requiredSkills,
      });
    });

    it('should propagate errors thrown by proxyRouterService', async () => {
      proxyRouterService.dispatchJobCreated.mockRejectedValue(
        new Error('Broker error'),
      );

      await expect(service.create(mockCreateJobDto)).rejects.toThrow(
        'Broker error',
      );
    });
  });

  describe('findAll', () => {
    it('should return the placeholder string', () => {
      expect(service.findAll()).toBe('This action returns all jobs');
    });
  });

  describe('findOne', () => {
    it('should return the placeholder string with the given id', () => {
      expect(service.findOne(42)).toBe('This action returns a #42 job');
    });
  });

  describe('update', () => {
    it('should return the placeholder string with the given id', () => {
      expect(service.update(7, {})).toBe('This action updates a #7 job');
    });
  });

  describe('remove', () => {
    it('should return the placeholder string with the given id', () => {
      expect(service.remove(3)).toBe('This action removes a #3 job');
    });
  });
});
