import { Controller, Post, Body } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Logger } from '@nestjs/common';

@Controller('candidates')
export class CandidatesController {
  private readonly logger: Logger = new Logger(CandidatesController.name);
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    this.logger.log(
      `Received request to create candidate with name: ${createCandidateDto.name}`,
    );
    return this.candidatesService.create(createCandidateDto);
  }
}
