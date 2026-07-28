import { PartialType } from '@nestjs/swagger';
import { CreateProfileEnricherDto } from './create-profile-enricher.dto';

export class UpdateProfileEnricherDto extends PartialType(CreateProfileEnricherDto) {}
