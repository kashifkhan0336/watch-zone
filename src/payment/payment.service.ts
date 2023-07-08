import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { PriceResponse } from './interfaces/priceResponse.interface';
import { PrismaService } from 'src/shared/services/prisma.service';
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

    async createSubscription(userId: string, priceId: string): Promise<any> {
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
            }
            // return {
            //     subscriptionId: subscription.id,
            //     clientSecret: invoice.payment_intent
            // }
        } catch (error) {

        }
    }
}
