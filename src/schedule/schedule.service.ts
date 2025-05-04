// src/schedule/schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenClose } from './open-close.entity/open-close.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(OpenClose)
    private readonly openCloseRepository: Repository<OpenClose>,
  ) {}
  async onModuleInit() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (const day of daysOfWeek) {
      const existing = await this.openCloseRepository.findOne({ where: { day } });
      if (!existing) {
        await this.openCloseRepository.save({
          day,
          openTime: '09:00',
          closeTime: '18:00',
        });
      }
    }
  }

  // Create a new open-close record
  async create(openClose: OpenClose): Promise<OpenClose> {
    return this.openCloseRepository.save(openClose);
  }

  // Get all open-close records
  async findAll(): Promise<OpenClose[]> {
    return this.openCloseRepository.find();
  }

  // Get one open-close record by ID
  async findOne(id: number): Promise<OpenClose | null> {
    return this.openCloseRepository.findOne({where: { id }});;
  }

  // Update an open-close record
  async update(id: number, openClose: OpenClose): Promise<OpenClose| null> {
    await this.openCloseRepository.update(id, openClose);
    return this.findOne(id);
  }

  // Delete an open-close record
  async remove(id: number): Promise<void> {
    await this.openCloseRepository.delete(id);
  }
}
