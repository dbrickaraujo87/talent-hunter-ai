import { PartialType } from '@nestjs/swagger';
import { CreateAiAnalyzerDto } from './create-ai-analyzer.dto';

export class UpdateAiAnalyzerDto extends PartialType(CreateAiAnalyzerDto) {}
