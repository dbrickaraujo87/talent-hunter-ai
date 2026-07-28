import { Module } from '@nestjs/common';
import { ProfileEnricherService } from './profile-enricher.service';
import { ProfileEnricherController } from './profile-enricher.controller';

@Module({
  controllers: [ProfileEnricherController],
  providers: [ProfileEnricherService],
})
export class ProfileEnricherModule {}
