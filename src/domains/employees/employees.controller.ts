import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employees.dto';

@Controller('organizations/:org_id/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Param('org_id') org_id: number) {
    return this.employeesService.findAll(org_id);
  }

  @Get(':employee_id')
  findOne(@Param('employee_id') employee_id: string) {
    return this.employeesService.findOneById(+employee_id);
  }

  @Patch(':employee_id')
  update(
    @Param('employee_id') employee_id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+employee_id, updateEmployeeDto);
  }

  @Delete(':employee_id')
  remove(@Param('employee_id') employee_id: string) {
    return this.employeesService.remove(+employee_id);
  }
}
