import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { IdsDto } from 'src/shared/dtos';
import { JobTitlesService } from './job-titles.service';
import {
  JobTitleCreateDto,
  JobTitleCreateManyDto,
  JobTitleUpdateDto,
} from './dtos';

@Controller('job-titles')
export class JobTitlesController {
  constructor(private readonly jobTitlesService: JobTitlesService) {}

  @Get()
  async findAll() {
    return await this.jobTitlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.jobTitlesService.findOneById(id);
  }

  @Post()
  async create(@Body() data: JobTitleCreateDto) {
    return await this.jobTitlesService.create(data);
  }

  @Post('create-many')
  async createMany(@Body() data: JobTitleCreateManyDto) {
    return await this.jobTitlesService.createMany(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: JobTitleUpdateDto) {
    return await this.jobTitlesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.jobTitlesService.remove(id);
  }

  @Post('remove-many')
  async removeMany(@Body() data: IdsDto) {
    return await this.jobTitlesService.removeMany(data.ids);
  }
}
