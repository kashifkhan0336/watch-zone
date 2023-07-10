/// <reference types="stripe-event-types" />
import { Injectable, CanActivate, ExecutionContext, Inject, RawBodyRequest } from '@nestjs/common';
import { Observable } from 'rxjs';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/stripe/constants';

import { Request } from 'express';
@Injectable()
export class StripeWebhookGuard implements CanActivate {
    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req: RawBodyRequest<Request & { event?: Stripe.Event }> = context.switchToHttp().getRequest();

        try {
            const event = this.stripe.webhooks.constructEvent(
                req.rawBody,
                req.header('Stripe-Signature'),
                process.env.STRIPE_WEBHOOK_SECRET
            ) as Stripe.DiscriminatedEvent;

            req.event = event;
            return true;
        } catch (err) {
            console.log(err);
            console.log(`⚠️  Webhook signature verification failed.`);
            console.log(`⚠️  Check the environment variable for the correct webhook secret.`);
            return false;
        }
    }
}
