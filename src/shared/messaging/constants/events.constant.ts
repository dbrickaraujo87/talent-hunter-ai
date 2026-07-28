// Enum de Eventos e Routing Keys

export const RABBITMQ_CONSTANTS = 'talent_hunter_exchange';

export enum RabbitMQQueue {
  AI_JOB_ANALYZER = 'ai_analyzer_job_queue',
  HUNTER_ENGINE = 'hunter_engine_search_queue',
  PROFILE_ENRICHER = 'profile_enricher_queue',
  MATCHING = 'matching_score_queue',
  OUTREACH = 'outreach_message_queue',
}

export enum DomainEvents {
  JOB_CREATED = 'job.created',
  JOB_ANALYZED = 'job.analyzed',
  CANDIDATE_RAW_FOUND = 'candidate.raw.found',
  CANDIDATE_CONSOLIDATED = 'candidate.consolidated',
  MATCHING_COMPLETED = 'matching.completed',
  OUTREACH_REQUESTED = 'outreach.requested',
}

export interface JobCreatedPayload {
  jobId: string;
  title: string;
  description: string;
  companyId: string;
}
