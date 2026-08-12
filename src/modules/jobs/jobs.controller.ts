import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DomainEvents } from '../../shared/messaging/constants/events.constant';

@Controller('jobs')
export class JobsController {
  private readonly logger = new Logger(JobsController.name);
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @EventPattern(DomainEvents.JOB_CREATED)
  create(@Body() createJobDto: CreateJobDto) {
    if (!createJobDto) {
      this.logger.error(
        'create was not created because createJobDto is required',
      );
      throw new Error('createJobDto is required');
    }

    try {
      this.logger.log(
        `Received job creation request with title: ${createJobDto.title}`,
      );
    } catch (error) {
      this.logger.error('Failed to process job creation request', error);
      throw error;
    }
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
