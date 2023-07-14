import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
    constructor(
        private paymentService: PaymentService
    ) { }
    stripWebHook(event: Stripe.DiscriminatedEvent) {
        switch (event.type) {
            case 'invoice.payment_succeeded':
                console.log("invoice payment success")
                this.paymentService.paymentSucceeded(event)
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                console.log("payment method attached!")
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;

            case 'payment_intent.payment_failed':
                const paymentFailed = event.data.object;
                console.log("Payment Failed")
                //console.log(paymentFailed)
                break;

            case 'invoice.payment_failed':
                const invoiceFailed = event.data.object;
                console.log("invoiced Payment Failed")
                //console.log(invoiceFailed)
                break;

            case 'subscription_schedule.canceled':
                const subscription = event.data.object;
                console.log("Subscription canceled!")
                //console.log(invoiceFailed)
                break;

            case 'customer.subscription.created':
                console.log("customer subscriptino created")
        }
    }
}
