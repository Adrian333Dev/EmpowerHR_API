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
import { IOrganizationsService } from './organizations.service';

@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly orgService: IOrganizationsService) {}

  @Post()
  create(@Body() createOrgInput: CreateOrgInput) {
    return this.orgService.create(createOrgInput);
  }
}
