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
import { CreateEmployeeInput, UpdateEmployeeInput } from './employees.input';
  
@Controller('organizations/:org_id/employees')
export class EmployeesController {
  // constructor(private readonly employeesService: EmployeesService) {}

  // @Post()
  // create(@Body() createEmployeeInput: CreateEmployeeInput) {
  //   return this.employeesService.create(createEmployeeInput);
  // }

  // @Get()
  // findAll(@Param('org_id') org_id: number) {
  //   return this.employeesService.findAll(org_id);
  // }

  // @Get(':employee_id')
  // findOne(@Param('employee_id') employee_id: string) {
  //   return this.employeesService.findOneById(+employee_id);
  // }

  // @Patch(':employee_id')
  // update(
  //   @Param('employee_id') employee_id: string,
  //   @Body() updateEmployeeInput: UpdateEmployeeInput,
  // ) {
  //   return this.employeesService.update(+employee_id, updateEmployeeInput);
  // }

  // @Delete(':employee_id')
  // remove(@Param('employee_id') employee_id: string) {
  //   return this.employeesService.remove(+employee_id);
  // }
}
