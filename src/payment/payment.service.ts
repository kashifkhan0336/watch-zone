import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { PriceResponse } from './interfaces/priceResponse.interface';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateSubscriptionResponse } from './interfaces/subscriptionResponse.interface';
import { generateTrialTimestamp } from './utils/utility';
@Injectable()
export class PaymentService {
    constructor(
        @Inject(STRIPE_CLIENT) private stripe: Stripe,
        private prisma: PrismaService
    ) { }
    async getPrices(): Promise<PriceResponse> {
        const prices = await this.stripe.prices.list({
            lookup_keys: ['basic', 'premium', 'extra_plus'],
            expand: ['data.product']
        })

        return {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            prices: prices.data,
        }
    }

    async createSubscription(userId: string, priceId: string): Promise<CreateSubscriptionResponse> {
        const user = await this.prisma.user.findFirst({ where: { userId } })
        try {
            const subscription = await this.stripe.subscriptions.create({
                customer: user.customerId,
                items: [{
                    price: priceId
                }],

                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
            })
            const invoice = subscription.latest_invoice as Stripe.Invoice
            if (invoice.payment_intent) {
                const intent = invoice.payment_intent as Stripe.PaymentIntent;
                return {
                    subscriptionId: subscription.id,
                    clientSecret: intent.client_secret
                }
            } else {
                throw new HttpException('Failed to create payment intent', HttpStatus.BAD_REQUEST);

            }
        } catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Failed to create subscription', HttpStatus.BAD_REQUEST);
            }
        }
    }

    async getSubscriptionData(customerId: string) {
        console.log(customerId)
    }

    async paymentSucceeded({ data: { object: { billing_reason, subscription, payment_intent } } }: Stripe.DiscriminatedEvent.InvoiceEvent) {
        const subscription_id = subscription as string
        const payment_intent_id = payment_intent as string
        console.log(billing_reason)
        if (billing_reason == 'subscription_create') {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(payment_intent_id)
            console.log(paymentIntent.payment_method)
            try {
                const subscription = await this.stripe.subscriptions.update(
                    subscription_id,
                    {
                        default_payment_method: paymentIntent.payment_method as string,
                    },
                );

                console.log("Default payment method set for subscription:" + paymentIntent.payment_method);
            } catch (err) {
                console.log(err);
                console.log(`⚠️  Falied to update the default payment method for subscription: ${subscription_id}`);
            }
        }
    }

    async cancelSubscription(userId: string) {
        console.log("")
    }
}
