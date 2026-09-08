import { Controller, Body, Post } from '@nestjs/common';
import { HunterEngineService } from './hunter-engine.service';
import { CreateHunterEngineDto } from './dto/create-hunter-engine.dto';

@Controller('hunter-engine')
export class HunterEngineController {
  constructor(private readonly hunterEngineService: HunterEngineService) {}

  @Post()
  create(@Body() createHunterEngineDto: CreateHunterEngineDto) {
    return this.hunterEngineService.create(createHunterEngineDto);
  }
}
