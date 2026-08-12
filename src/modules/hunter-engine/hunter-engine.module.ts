import { Module } from '@nestjs/common';
import { HunterEngineService } from './hunter-engine.service';
import { HunterEngineController } from './hunter-engine.controller';
import { HunterEngineConsumer } from './hunter-engine.consumer';

@Module({
  controllers: [HunterEngineController],
  providers: [HunterEngineService, HunterEngineConsumer],
})
export class HunterEngineModule {}
