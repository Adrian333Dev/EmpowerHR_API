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
import { CreateOrgDto, UpdateOrgDto } from './organizations.dto';

@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @Post()
  create(@Body() createOrgDto: CreateOrgDto) {
    return this.orgService.create(createOrgDto);
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
  update(@Param('org_id') org_id: number, @Body() updateOrgDto: UpdateOrgDto) {
    return this.orgService.update(org_id, updateOrgDto);
  }

  @Delete(':org_id')
  remove(@Param('org_id') org_id: number) {
    return this.orgService.remove(org_id);
  }
}
