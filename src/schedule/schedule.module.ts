// src/schedule/schedule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { OpenClose } from './open-close.entity/open-close.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpenClose])], // ✅ Needed for repository injection
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
