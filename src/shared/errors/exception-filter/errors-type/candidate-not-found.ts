import { AppError } from '../app-error';

export class CandidateNotFoundError extends AppError {
  readonly code = 'CANDIDATE_NOT_FOUND';
  constructor(data: string) {
    super(`Candidate with ${data} not found`);
  }
}
