import { PartialType } from '@nestjs/swagger';
import { CreateHunterEngineDto } from './create-hunter-engine.dto';

export class UpdateHunterEngineDto extends PartialType(CreateHunterEngineDto) {}
