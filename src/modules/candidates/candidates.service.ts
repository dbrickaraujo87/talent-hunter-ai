import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { Logger } from '@nestjs/common';
import { CandidateNotFoundError } from '../../shared/errors/exception-filter/errors-type/candidate-not-found';

@Injectable()
export class CandidatesService {
  private readonly logger: Logger = new Logger(CandidatesService.name);
  constructor(private readonly candidateRepository: Repository<Candidate>) {}
  async create(createCandidateDto: CreateCandidateDto) {
    const candidate = await this.candidateRepository
      .findOne({
        where: { name: createCandidateDto.name },
      })
      .catch(() => {
        throw new CandidateNotFoundError(`Name ${createCandidateDto.name}`);
      });

    if (candidate)
      throw new Error(
        `Candidate with name ${createCandidateDto.name} already exists`,
      );

    this.logger.log(`Creating candidate with name: ${createCandidateDto.name}`);
    return await this.candidateRepository.save(createCandidateDto);
  }
  async FindOneByCode(code: string) {
    return await this.candidateRepository
      .findOne({
        where: { code },
      })
      .catch(() => {
        throw new CandidateNotFoundError(
          `Candidate with code ${code} not found`,
        );
      });
  }
  async FindOneByName(name: string) {
    return await this.candidateRepository
      .findOne({
        where: { name },
      })
      .catch(() => {
        throw new CandidateNotFoundError(
          `Candidate with name ${name} not found`,
        );
      });
  }
}
