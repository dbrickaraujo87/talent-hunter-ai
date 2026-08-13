import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ProxyRouterService } from '../../shared/messaging/proxy-router.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCreatedPayload } from '../../shared/messaging/constants/events.constant';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  private readonly logger: Logger = new Logger(JobsService.name);
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly proxyRouterService: ProxyRouterService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    if (!createJobDto) {
      this.logger.error('createJobDto is required');
    }
    try {
      this.logger.log(`Creating job with title: ${createJobDto.title}`);

      // Instancia entidade de banco
      const jobEntity = this.jobRepository.create(createJobDto);
      jobEntity.id = crypto.randomUUID();

      if (!jobEntity) {
        this.logger.error('Failed to create job entity from DTO');
        throw new Error('Failed to create job entity from DTO');
      }
      //salva unidade em banco
      const savedJob = await this.jobRepository
        .save(jobEntity)
        .catch((error) => {
          this.logger.error('Failed to save job to the database', error);
          throw error;
        });

      const payload = JobsService.toJobCreatedPayload(savedJob);

      this.logger.log('send job to persistence service');

      this.logger.log(
        `Dispatching job created event with payload: ${JSON.stringify(payload)}`,
      );

      return this.proxyRouterService.dispatchJobCreated(payload);
    } catch (error) {
      this.logger.error('Failed to create job', error);
      throw error;
    }
  }

  findAll() {
    return 'This action returns all jobs';
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }

  //#region Private Methods
  private static toJobCreatedPayload(job: Job): JobCreatedPayload {
    return {
      jobId: job.id,
      title: job.title,
      description: job.description,
      companyId: job.companyId,
      salary: job.salary,
      location: job.location,
      seniority: job.seniority,
      requiredSkills: job.requiredSkills,
    };
  }
  //#endregion
}
