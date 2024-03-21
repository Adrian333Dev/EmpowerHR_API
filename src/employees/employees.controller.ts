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
import { EmployeesService } from './employees.service';
import { EmployeeCreateDto, EmployeeUpdateDto } from './dtos';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.employeesService.findOneById(id);
  }

  @Post()
  async create(@Body() data: EmployeeCreateDto) {
    return await this.employeesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: EmployeeUpdateDto) {
    return await this.employeesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.employeesService.remove(id);
  }

  @Post('remove-many')
  async removeMany(@Body() { ids }: IdsDto) {
    return await this.employeesService.removeMany(ids);
  }
}
