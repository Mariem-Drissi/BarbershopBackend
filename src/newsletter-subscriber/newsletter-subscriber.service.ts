  // src/newsletter-subscriber/newsletter-subscriber.service.ts
  import { Injectable, ConflictException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { NewsletterSubscriber } from './newsletter-subscriber.entity';
  import { MailerService } from '@nestjs-modules/mailer';
  import * as path from 'path'; // ✅ Import path module

  @Injectable()
  export class NewsletterSubscriberService {
    constructor(
      @InjectRepository(NewsletterSubscriber)
      private readonly newsletterSubscriberRepository: Repository<NewsletterSubscriber>,
      private readonly mailerService: MailerService,
    ) {}

    async subscribe(email: string) {
      const existingSubscriber = await this.newsletterSubscriberRepository.findOne({ where: { email } });

      if (existingSubscriber) {
        throw new ConflictException('You are already subscribed!');
      }

      const newSubscriber = this.newsletterSubscriberRepository.create({ email });
      await this.newsletterSubscriberRepository.save(newSubscriber);

      try {
        await this.mailerService.sendMail({
          to: email,
          subject: '🎉 Thank You for Subscribing!',
          template: './confirmation', // templates/confirmation.hbs
          context: {
            email,
          },
          attachments: [
            {
              filename: 'Barbershop-0.jpg',
              path: path.join(__dirname, '..', '..', 'assets', 'Barbershop-0.jpg'), // ✅ Correct path
              cid: 'newsletterImage', // ✅ Matches the cid in your template
            },
          ],
        });
      } catch (error) {
        console.error('❌ Error sending email:', error);
      }

      return { message: 'Subscription successful!' };
    }

    async findAll() {
      const subscribers = await this.newsletterSubscriberRepository.find();
      return subscribers.map(sub => ({
        id: sub.id,
        email: sub.email,
        subscribedAt: sub.subscribedAt, 
      }));
    }

    async delete(id: number) {
      return this.newsletterSubscriberRepository.delete(id);
    }

    async deleteMultiple(ids: number[]) {
      return this.newsletterSubscriberRepository.delete(ids);
    }
  }
