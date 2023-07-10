import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeWebhookGuard } from './guards/stripeWebhook.guard';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(
        private webHookService: WebhookService
    ) {

    }
    @UseGuards(StripeWebhookGuard)
    @Post("/")
    webHook(@Req() request: Request & { event?: Stripe.DiscriminatedEvent }) {
        this.webHookService.stripWebHook(request.event)
    }
}
