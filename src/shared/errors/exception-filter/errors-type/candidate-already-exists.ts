import { AppError } from '../app-error';

export class CandidateAlreadyExistsError extends AppError {
  readonly code = 'CANDIDATE_ALREADY_EXISTS';
  constructor(candidateId: string) {
    super(`Candidate with ID ${candidateId} already exists`);
  }
}
