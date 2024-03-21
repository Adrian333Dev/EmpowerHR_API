import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { DepartmentCreateDto, DepartmentUpdateDto } from './dtos';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll() {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.departmentsService.findOne(id);
  }

  @Post()
  async create(@Body() data: DepartmentCreateDto) {
    return await this.departmentsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: DepartmentUpdateDto) {
    return await this.departmentsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.departmentsService.remove(id);
  }
}
