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

  @Get(':orgId')
  findOne(@Param('orgId') orgId: number) {
    return this.orgService.findOneById(orgId);
  }

  @Patch(':orgId')
  update(@Param('orgId') orgId: number, @Body() updateOrgInput: UpdateOrgInput) {
    return this.orgService.update(orgId, updateOrgInput);
  }

  @Delete(':orgId')
  remove(@Param('orgId') orgId: number) {
    return this.orgService.remove(orgId);
  }
}
