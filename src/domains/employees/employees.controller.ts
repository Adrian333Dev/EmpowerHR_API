import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEmployeeInput, UpdateEmployeeInput } from './employees.input';
import { EmployeesService } from './employees.service';
  
@Controller('organizations/:orgId/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeInput: CreateEmployeeInput) {
    return this.employeesService.create(createEmployeeInput);
  }
}
