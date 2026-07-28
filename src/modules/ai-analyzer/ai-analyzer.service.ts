import { Injectable } from '@nestjs/common';
import { CreateAiAnalyzerDto } from './dto/create-ai-analyzer.dto';
import { UpdateAiAnalyzerDto } from './dto/update-ai-analyzer.dto';

@Injectable()
export class AiAnalyzerService {
  create(createAiAnalyzerDto: CreateAiAnalyzerDto) {
    return 'This action adds a new aiAnalyzer';
  }

  findAll() {
    return `This action returns all aiAnalyzer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiAnalyzer`;
  }

  update(id: number, updateAiAnalyzerDto: UpdateAiAnalyzerDto) {
    return `This action updates a #${id} aiAnalyzer`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiAnalyzer`;
  }
}
