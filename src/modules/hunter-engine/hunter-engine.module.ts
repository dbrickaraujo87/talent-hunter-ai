import { Module } from '@nestjs/common';
import { HunterEngineService } from './hunter-engine.service';
import { HunterEngineController } from './hunter-engine.controller';

@Module({
  controllers: [HunterEngineController],
  providers: [HunterEngineService],
})
export class HunterEngineModule {}
