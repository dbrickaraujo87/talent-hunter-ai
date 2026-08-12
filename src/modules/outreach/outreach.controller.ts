import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OutreachService } from './outreach.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { UpdateOutreachDto } from './dto/update-outreach.dto';

@Controller('outreach')
export class OutreachController {
  constructor(private readonly outreachService: OutreachService) {}

  // @Post()
  // create(@Body() createOutreachDto: CreateOutreachDto) {
  //   return this.outreachService.create(createOutreachDto);
  // }

  // @Get()
  // findAll() {
  //   return this.outreachService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.outreachService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOutreachDto: UpdateOutreachDto,
  // ) {
  //   return this.outreachService.update(+id, updateOutreachDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.outreachService.remove(+id);
  // }
}
