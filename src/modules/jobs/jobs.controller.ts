import { Controller, Post, Body, Logger } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('jobs')
export class JobsController {
  private readonly logger: Logger = new Logger(JobsController.name);
  constructor(private readonly jobsService: JobsService) {}

  @Public()
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    this.logger.log(
      `Received request to create job with title: ${createJobDto.title}`,
    );
    return this.jobsService.create(createJobDto);
  }
}
