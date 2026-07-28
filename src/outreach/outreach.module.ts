import { Module } from '@nestjs/common';
import { OutreachService } from './outreach.service';

@Module({
  providers: [OutreachService]
})
export class OutreachModule {}
