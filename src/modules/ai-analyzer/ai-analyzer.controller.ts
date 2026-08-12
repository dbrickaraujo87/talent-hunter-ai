import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AiAnalyzerService } from './ai-analyzer.service';
import { CreateAiAnalyzerDto } from './dto/create-ai-analyzer.dto';
import { UpdateAiAnalyzerDto } from './dto/update-ai-analyzer.dto';

@Controller('ai-analyzer')
export class AiAnalyzerController {
  constructor(private readonly aiAnalyzerService: AiAnalyzerService) {}

  // @Post()
  // create(@Body() createAiAnalyzerDto: CreateAiAnalyzerDto) {
  //   return this.aiAnalyzerService.create(createAiAnalyzerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.aiAnalyzerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aiAnalyzerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAiAnalyzerDto: UpdateAiAnalyzerDto,
  // ) {
  //   return this.aiAnalyzerService.update(+id, updateAiAnalyzerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aiAnalyzerService.remove(+id);
  // }
}
