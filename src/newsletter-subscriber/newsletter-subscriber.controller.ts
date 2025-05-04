// src/newsletter-subscriber/newsletter-subscriber.controller.ts
import { Controller, Post, Body, ConflictException, Get, Delete, Param } from '@nestjs/common';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';

@Controller('newsletter-subscriber')
export class NewsletterSubscriberController {
  constructor(private readonly newsletterSubscriberService: NewsletterSubscriberService) {}

  @Post('subscribe')
  async subscribe(@Body('email') email: string) {
    try {
      return await this.newsletterSubscriberService.subscribe(email);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  @Get()
  async findAll() {
    return this.newsletterSubscriberService.findAll();
  }
  
  @Post('delete-many')
  async deleteMultiple(@Body('ids') ids: number[]) {
    return this.newsletterSubscriberService.deleteMultiple(ids);
  }
  

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.newsletterSubscriberService.delete(id);
  }
}
