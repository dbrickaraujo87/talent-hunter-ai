import {
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CandidateNotFoundError } from './errors-type/candidate-not-found';
import { CandidateAlreadyExistsError } from './errors-type/candidate-already-exists';

export class ErrorMapper {
  static toHttpException(error: any) {
    if (error instanceof CandidateNotFoundError) {
      return new NotFoundException({
        code: error.code,
        message: error.message,
      });
    }
    if (error instanceof CandidateAlreadyExistsError) {
      return new ConflictException({
        code: error.code,
        message: error.message,
      });
    }
    return new InternalServerErrorException({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    }); // Default fallback
  }
}
