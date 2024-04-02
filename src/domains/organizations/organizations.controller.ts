import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrgInput, UpdateOrgInput } from './organizations.input';

@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @Post()
  create(@Body() createOrgInput: CreateOrgInput) {
    return this.orgService.create(createOrgInput);
  }

  @Get()
  findAll() {
    return this.orgService.findAll();
  }

  @Get(':org_id')
  findOne(@Param('org_id') org_id: number) {
    return this.orgService.findOneById(org_id);
  }

  @Patch(':org_id')
  update(@Param('org_id') org_id: number, @Body() updateOrgInput: UpdateOrgInput) {
    return this.orgService.update(org_id, updateOrgInput);
  }

  @Delete(':org_id')
  remove(@Param('org_id') org_id: number) {
    return this.orgService.remove(org_id);
  }
}
