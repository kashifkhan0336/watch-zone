import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { StripeWebhookGuard } from './webhook/guards/stripeWebhook.guard';
import Stripe from 'stripe';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailService: MailerService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("testmail")
  test(): void {
    this.mailService
      .sendMail({
        to: 'housemd0336@gmail.com', // list of receivers
        from: 'kashifkhan0336@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        template: 'emailVerification', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          verificationUrl: 'http://localhost:3000/api/v1/testmail',
        },
      })
      .then(() => { console.log("email sent!") })
      .catch((err) => { console.log(err) });
  }
}

