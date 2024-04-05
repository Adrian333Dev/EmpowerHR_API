import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrgInput, UpdateOrgInput } from './organizations.input';
import { OrganizationsService } from './organizations.service';

@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @Post()
  create(@Body() createOrgInput: CreateOrgInput) {
    return this.orgService.create(createOrgInput);
  }
}
