import { Injectable } from '@nestjs/common';
import { CreateProfileEnricherDto } from './dto/create-profile-enricher.dto';
import { UpdateProfileEnricherDto } from './dto/update-profile-enricher.dto';

@Injectable()
export class ProfileEnricherService {
  create(createProfileEnricherDto: CreateProfileEnricherDto) {
    return 'This action adds a new profileEnricher';
  }

  findAll() {
    return `This action returns all profileEnricher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileEnricher`;
  }

  update(id: number, updateProfileEnricherDto: UpdateProfileEnricherDto) {
    return `This action updates a #${id} profileEnricher`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileEnricher`;
  }
}
