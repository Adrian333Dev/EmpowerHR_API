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
import { ReviewsService } from './reviews.service';
import { ReviewCreateDto, ReviewUpdateDto } from './dtos';

@Controller('employees/:employeeId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAllByEmployeeId(@Param('employeeId') id: number) {
    return await this.reviewsService.findAllByEmployeeId(id);
  }

  @Get(':reviewId')
  async findOneById(@Param('reviewId') id: number) {
    return await this.reviewsService.findOneById(id);
  }

  @Post()
  async create(@Body() data: ReviewCreateDto) {
    return await this.reviewsService.create(data);
  }

  @Patch(':reviewId')
  async update(@Param('reviewId') id: number, @Body() data: ReviewUpdateDto) {
    return await this.reviewsService.update(id, data);
  }

  @Delete(':reviewId')
  async remove(@Param('reviewId') id: number) {
    return await this.reviewsService.remove(id);
  }

  @Post('remove-many')
  async removeMany(
    @Param('employeeId') employeeId: number,
    @Body() { ids }: IdsDto,
  ) {
    return await this.reviewsService.removeMany(employeeId, ids);
  }
}
