// src/schedule/schedule.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { OpenClose } from './open-close.entity/open-close.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // Create a new open-close record
  @Post()
  async create(@Body() openClose: OpenClose): Promise<OpenClose> {
    return this.scheduleService.create(openClose);
  }

  // Get all open-close records
  @Get()
  async findAll(): Promise<OpenClose[]> {
    return this.scheduleService.findAll();
  }

  // Get one open-close record by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OpenClose | null> {
    return this.scheduleService.findOne(id);
  }

  // Update an open-close record
  @Put(':id')
  async update(@Param('id') id: number, @Body() openClose: OpenClose): Promise<OpenClose | null> {
    return this.scheduleService.update(id, openClose);
  }

  // Delete an open-close record
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.scheduleService.remove(id);
  }
}
