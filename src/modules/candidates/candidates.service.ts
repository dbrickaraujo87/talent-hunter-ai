import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class CandidatesService {
  private readonly logger: Logger = new Logger(CandidatesService.name);
  constructor(private readonly candidateRepository: Repository<Candidate>) {}
  create(createCandidateDto: CreateCandidateDto) {
    this.logger.log(`Creating candidate with name: ${createCandidateDto.name}`);
    return;
  }
}
