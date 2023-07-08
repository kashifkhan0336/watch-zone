import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { expand } from 'rxjs';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session.decorator';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
@Controller('payment')
@UseGuards(new AuthGuard())
export class PaymentController {
    constructor(
        @Inject(STRIPE_CLIENT) private stripe: Stripe
    ) { }
    @Get("/customers")
    async listCustomers(@Session() session: SessionContainer) {
        let userId = session.getUserId();
        
        let userInfo = await ThirdPartyEmailPassword.getUserById(userId);
        return userInfo;
    }

    @Get("/config")
    async Config(): Promise<{ publishableKey: string; prices: Stripe.Price[] }> {
        const prices = await this.stripe.prices.list({
            lookup_keys: ['basic', 'premium', 'extra_plus'],
            expand: ['data.product']
        })

        return {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            prices: prices.data,
        }
    }
}
