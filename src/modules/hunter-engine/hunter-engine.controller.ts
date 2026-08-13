import { Controller, Body } from '@nestjs/common';
import { HunterEngineService } from './hunter-engine.service';

@Controller('hunter-engine')
export class HunterEngineController {
  constructor(private readonly hunterEngineService: HunterEngineService) {}

  // @Post()
  // create(@Body() createHunterEngineDto: CreateHunterEngineDto) {
  //   return this.hunterEngineService.create(createHunterEngineDto);
  // }

  // @Get()
  // findAll() {
  //   return this.hunterEngineService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hunterEngineService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateHunterEngineDto: UpdateHunterEngineDto,
  // ) {
  //   return this.hunterEngineService.update(+id, updateHunterEngineDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hunterEngineService.remove(+id);
  // }
}
