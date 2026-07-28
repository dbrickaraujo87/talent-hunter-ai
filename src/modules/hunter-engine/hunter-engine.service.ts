import { Injectable } from '@nestjs/common';
import { CreateHunterEngineDto } from './dto/create-hunter-engine.dto';
import { UpdateHunterEngineDto } from './dto/update-hunter-engine.dto';

@Injectable()
export class HunterEngineService {
  create(createHunterEngineDto: CreateHunterEngineDto) {
    return 'This action adds a new hunterEngine';
  }

  findAll() {
    return `This action returns all hunterEngine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hunterEngine`;
  }

  update(id: number, updateHunterEngineDto: UpdateHunterEngineDto) {
    return `This action updates a #${id} hunterEngine`;
  }

  remove(id: number) {
    return `This action removes a #${id} hunterEngine`;
  }
}
