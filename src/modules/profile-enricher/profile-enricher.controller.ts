import { Controller, Body } from '@nestjs/common';
import { ProfileEnricherService } from './profile-enricher.service';

@Controller('profile-enricher')
export class ProfileEnricherController {
  constructor(
    private readonly profileEnricherService: ProfileEnricherService,
  ) {}
}
