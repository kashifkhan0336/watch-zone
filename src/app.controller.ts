import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { StripeWebhookGuard } from './webhook/guards/stripeWebhook.guard';
import Stripe from 'stripe';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}
