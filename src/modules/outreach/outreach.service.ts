import { Injectable } from '@nestjs/common';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { UpdateOutreachDto } from './dto/update-outreach.dto';

@Injectable()
export class OutreachService {
  create(createOutreachDto: CreateOutreachDto) {
    return 'This action adds a new outreach';
  }

  findAll() {
    return `This action returns all outreach`;
  }

  findOne(id: number) {
    return `This action returns a #${id} outreach`;
  }

  update(id: number, updateOutreachDto: UpdateOutreachDto) {
    return `This action updates a #${id} outreach`;
  }

  remove(id: number) {
    return `This action removes a #${id} outreach`;
  }
}
