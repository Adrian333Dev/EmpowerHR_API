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
import { IEmployeesService } from './employees.service';
  
@Controller('organizations/:orgId/employees')
export class EmployeesController {
  constructor(private readonly employeesService: IEmployeesService) {}

  @Post()
  create(@Body() createEmployeeInput: CreateEmployeeInput) {
    return this.employeesService.create(createEmployeeInput);
  }
}
