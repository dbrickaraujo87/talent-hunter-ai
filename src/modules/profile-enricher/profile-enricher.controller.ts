import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileEnricherService } from './profile-enricher.service';
import { CreateProfileEnricherDto } from './dto/create-profile-enricher.dto';
import { UpdateProfileEnricherDto } from './dto/update-profile-enricher.dto';

@Controller('profile-enricher')
export class ProfileEnricherController {
  constructor(
    private readonly profileEnricherService: ProfileEnricherService,
  ) {}

  // @Post()
  // create(@Body() createProfileEnricherDto: CreateProfileEnricherDto) {
  //   return this.profileEnricherService.create(createProfileEnricherDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profileEnricherService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileEnricherService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProfileEnricherDto: UpdateProfileEnricherDto,
  // ) {
  //   return this.profileEnricherService.update(+id, updateProfileEnricherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileEnricherService.remove(+id);
  // }
}
